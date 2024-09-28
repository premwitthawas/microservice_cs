
using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly AuctionDbContext _dbContext;
    public BidPlacedConsumer(AuctionDbContext dbContext)
    {
        this._dbContext = dbContext;
    }
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine($"Cosumer From Bid placed[Auction Service] AuctionId: {context.Message.AuctionId}");
        var auction = await this._dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId)) ??  
        throw new MessageException(typeof(AuctionFinished), "Cannot retrieve this auction");

        if (auction.CurrentHighBid == null ||
          context.Message.BidStatus.Contains("Accepted") &&
          context.Message.Amount > auction.CurrentHighBid)
        {
            auction.CurrentHighBid = context.Message.Amount;
            await this._dbContext.SaveChangesAsync();
        };
    }
}
