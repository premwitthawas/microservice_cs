
using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data;

public class DbSeed
{
    public static async Task InitDB(WebApplication app)
    {
        await DB.InitAsync("SearchDb",
        MongoClientSettings
        .FromConnectionString(app
        .Configuration
        .GetConnectionString("DefaultConnection")));
        //SEARCH FULL TEXT
        await DB.Index<Item>()
        .Key(x => x.Make, KeyType.Text)
        .Key(x => x.Model, KeyType.Text)
        .Key(x => x.Color, KeyType.Text)
        .CreateAsync();
        Console.WriteLine("Started Sync Data From Service http ....");

        using var scope = app.Services.CreateScope();
        var httpClient = scope.ServiceProvider.GetRequiredService<AuctionSvcHttpClient>();
        var items = await httpClient.GetItemForSearchDB();
        Console.WriteLine("Return from the Auction services : => " + items.Count);
        if (items.Count > 0) await DB.SaveAsync(items);
        Console.WriteLine("Sync Data Success from Auction Services");
    }
}
