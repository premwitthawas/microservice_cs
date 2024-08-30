using AuctionService.Data;
using AuctionService.RequestHelpers;
using MassTransit;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAutoMapper(typeof(MappingProfiles));
builder.Services.AddMassTransit(x =>
{
    x.UsingRabbitMq((ctx, cfg) =>
    {
        cfg.Host("localhost", 5673, "/", host =>
        {
            host.Username("guest");
            host.Password("guest");
        });
        cfg.ConfigureEndpoints(ctx);
    });
});

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
