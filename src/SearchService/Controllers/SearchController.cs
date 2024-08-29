using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Item>>> SearchItems([FromQuery] string searchTerm,
        [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 4)
        {
            var query = DB.PagedSearch<Item>();
            query.Sort(x => x.Ascending(a => a.Make));
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query.Match(Search.Full, searchTerm).SortByTextScore();
            }
            query.PageNumber(pageNumber);
            query.PageSize(pageSize);
            var result = await query.ExecuteAsync();
            return Ok(new
            {
                results = result.Results,
                pageCount = result.PageCount,
                totalCount = result.TotalCount
            });
        }
    }
}
