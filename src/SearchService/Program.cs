
using SearchService.Data;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

try
{
    await DbSeed.InitDB(app);
}
catch (Exception e)
{
    Console.WriteLine(e);
}

app.Run();
