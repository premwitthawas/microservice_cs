
using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;

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

        var count = await DB.CountAsync<Item>();

        if (count == 0)
        {
            Console.WriteLine("Data will seeding .....");
            var itemData = await File.ReadAllTextAsync("Data/auctions.json");
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var items = JsonSerializer.Deserialize<List<Item>>(itemData, options);
            await DB.SaveAsync(items);
            Console.WriteLine("Data Seed Successfully.");
        }
    
        Console.WriteLine("Data Existing....");
    }
}
