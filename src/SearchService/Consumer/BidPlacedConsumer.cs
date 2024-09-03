using System;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumer;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine($"Cosumer From Bid placed[Search Service] AuctionId: {context.Message.AuctionId}");
        var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);
        if (context.Message.BidStatus.Contains("Accepted") &&
        context.Message.Amount > auction.CurrentHighBid)
        {
            auction.CurrentHighBid = context.Message.Amount;
            await auction.SaveAsync();
        }
    }
}
