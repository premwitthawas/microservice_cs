using AuctionService.Data;
using AuctionService.RequestHelpers;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAutoMapper(typeof(MappingProfiles));

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

try
{
    DbSeedingInit.InitDb(app);
}
catch (Exception e)
{
    Console.WriteLine(e);
}

app.Run();
