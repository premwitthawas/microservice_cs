
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services;

public class AuctionSvcHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    public AuctionSvcHttpClient(HttpClient httpClient, IConfiguration config)
    {
        this._httpClient = httpClient;
        this._config = config;
    }

    public async Task<List<Item>> GetItemForSearchDB()
    {
        var lastUpdated = await DB.Find<Item, string>()
            .Sort(x => x.Descending(x => x.UpdatedAt))
            .Project(x => x.UpdatedAt.ToString())
            .ExecuteFirstAsync();
        string url = this._config["AuctionServiceUrl"] + "/api/auctions?date=" + lastUpdated;
        return await this._httpClient.GetFromJsonAsync<List<Item>>(url);
    }
}
