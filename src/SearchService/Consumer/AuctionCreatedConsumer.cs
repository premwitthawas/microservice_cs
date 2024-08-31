using System;
using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumer;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IMapper _mapper;
    public AuctionCreatedConsumer(IMapper mapper)
    {
        this._mapper = mapper;
    }
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine($"Auction Created message : {context.Message.Id}");
        var item = this._mapper.Map<Item>(context.Message);

        if(item.Model == "Foo") throw new ArgumentException("Cannot sell car with name of Foo");

        await item.SaveAsync();
    }
}
