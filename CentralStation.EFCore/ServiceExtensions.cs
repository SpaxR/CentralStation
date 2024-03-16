using CentralStation.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CentralStation.EFCore;

public static class ServiceExtensions
{
    public static IServiceCollection AddEntityFrameworkCore
        (this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<CentralStationDbContext>(options =>
        {
            var connectionString = configuration.GetConnectionString(AppConstants.ApplicationName)
                ?? configuration.GetConnectionString("Default");
            if (string.IsNullOrEmpty(connectionString))
            {
                Console.WriteLine("Missing ConnectionString, using InMemory");
                options.UseInMemoryDatabase(AppConstants.ApplicationName);
            }
            else
            {
                options.UseSqlServer(connectionString);
            }
        });

        return services;
    }
}
