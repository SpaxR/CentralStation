using System.Reflection;
using CentralStation.API;
using CentralStation.API.Conventions;
using CentralStation.Application;
using CentralStation.EFCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCentralStationSwagger();

builder.Services.AddEntityFrameworkCore(builder.Configuration);

builder.Services.AddControllers(config => { config.Conventions.Add(new CentralStationControllerConvention()); })
    .ConfigureApplicationPartManager(manager =>
    {
        manager.FeatureProviders.Add(new CentralStationControllerProvider());
    })
    .AddApplicationPart(typeof(IApplicationService).Assembly)
    ;
builder.Services.AddAutoMapper(config =>
{
    config.AddMaps(Assembly.GetExecutingAssembly());
    config.AddMaps(typeof(IApplicationService).Assembly);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseCentralStationSwagger();
}

app.UseCors(cors => cors
    .WithOrigins(app.Configuration["ClientAddress"]!)
    .AllowAnyMethod()
    .AllowAnyHeader()
);

app.UseHttpsRedirection();

app.MapControllers()
    .WithOpenApi();

app.Run();