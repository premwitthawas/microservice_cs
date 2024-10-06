using AuctionService.Data;
using Grpc.Core;
namespace AuctionService.Services
{
    public class GrpcAuctionService : GrpcAuction.GrpcAuctionBase
    {
        private readonly AuctionDbContext _context;
        public GrpcAuctionService(AuctionDbContext context)
        {
            this._context = context;
        }

        public override async Task<GrpcAuctionResponse> GetAuction(GetAuctionRequest request, ServerCallContext context)
        {
            Console.WriteLine("===> Received Grpc Request for auction");
            var auction = await this._context.Auctions.FindAsync(Guid.Parse(request.Id));
            if (auction == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, "Not found"));
            }
            var response = new GrpcAuctionResponse
            {
                Auction = new GrpcAuctionModel
                {
                    AuctionEnd = auction.AuctionEnd.ToString(),
                    Id = auction.Id.ToString(),
                    ReservePrice = auction.ReservePrice,
                    Seller = auction.Seller
                }
            };
            return response;
        }
    }
}