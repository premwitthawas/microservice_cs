using AutoMapper;
using BiddingService.Dtos;
using BiddingService.Models;
using BiddingService.Services;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;

namespace BiddingService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly GrpcAuctionClient _grpcAuctionClient;
        private readonly IMapper _mapper;
        private readonly IPublishEndpoint _endpoint;
        public BidsController(IMapper mapper, IPublishEndpoint endpoint,GrpcAuctionClient grpcAuctionClient)
        {
            this._mapper = mapper;
            this._endpoint = endpoint;
            this._grpcAuctionClient = grpcAuctionClient;
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BidDto>> PlaceBid([FromQuery] string auctionId, [FromQuery] int amount)
        {
            var auction = await DB.Find<Auction>().OneAsync(auctionId);
            if (auction == null)
            {
                auction = this._grpcAuctionClient.GetAuction(auctionId);
                if(auction == null)
                {
                    return BadRequest("Cannot accepted bids on this auction at the time");
                }
            }
            if (auction.Seller == User.Identity.Name)
            {
                return BadRequest("You cannot bid you own auction");
            }

            var bid = new Bid
            {
                Amount = amount,
                AuctionId = auctionId,
                Bidder = User.Identity.Name
            };

            if (auction.AuctionEnd < DateTime.UtcNow)
            {
                bid.BidStatus = BidStatus.Finished;
            }
            else
            {
                var highBid = await DB.Find<Bid>().Match(a => a.AuctionId == auctionId)
         .Sort(b => b.Descending(x => x.Amount)).ExecuteFirstAsync();

                if (highBid != null && amount > highBid.Amount || highBid == null)
                {
                    bid.BidStatus = amount > auction.ReservePrice ? BidStatus.Accepted :
                    BidStatus.AcceptedBelowReserve;
                }

                if (highBid != null && bid.Amount <= highBid.Amount)
                {
                    bid.BidStatus = BidStatus.TooLow;
                }
            }

            await DB.SaveAsync(bid);
            await this._endpoint.Publish(this._mapper.Map<BidPlaced>(bid));

            return Ok(this._mapper.Map<BidDto>(bid));
        }
        [HttpGet("{auctionId}")]
        public async Task<ActionResult<List<BidDto>>> GetBidForAuction(string auctionId)
        {
            var bids = await DB.Find<Bid>().Match(a => a.AuctionId == auctionId)
            .Sort(b => b.Descending(x => x.BidTime)).ExecuteAsync();
            return bids.Select(this._mapper.Map<BidDto>).ToList();
        }
    }
}
