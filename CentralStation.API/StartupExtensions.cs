using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace CentralStation.API;

public static class StartupExtensions
{
    /**
     * Adds API-Exploration, Swagger-Generation and the default v1-documentation
     */
    public static IServiceCollection AddCentralStationSwagger(this IServiceCollection services)
    {
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(config => { config.SwaggerDoc("v1", new OpenApiInfo { Title = "CentralStation" }); });

        return services;
    }

    /**
     * Configures the Swagger-UI at the root-path
     */
    public static IApplicationBuilder UseCentralStationSwagger(this WebApplication app)
    {
        var logger = app.Services.GetRequiredService<ILogger<Program>>();

        app.MapSwagger("docs/{documentName}.json");
        app.UseSwaggerUI(config =>
        {
            config.RoutePrefix = string.Empty;
            config.DocumentTitle = "CentralStation - OpenAPI";
            config.SwaggerEndpoint("/docs/v1.json", "v1");
            config.DocExpansion(DocExpansion.None);
            config.DefaultModelRendering(ModelRendering.Model);
            config.EnableTryItOutByDefault();
        });

        foreach (var url in app.Configuration["ASPNETCORE_URLS"]!.Split(";"))
        {
            logger.LogInformation("API-Documentation: {Endpoint}", url + "/docs");
        }

        return app;
    }
}