using CentralStation.Core;
using Microsoft.Extensions.Configuration;

namespace Migrator.Infrastructure;

public static class AppSettingsService
{
    public static string GetConnectionString()
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", true)
            .AddJsonFile("appsettings.local.json", true)
            .AddJsonFile("appsettings.Development.json", true)
            .AddJsonFile("appsettings.Development.local.json", true)
            .Build();

        return config.GetConnectionString(AppConstants.ApplicationName)
               ?? config.GetConnectionString("Default")
               ?? throw new Exception("Missing ConnectionString");
    }
}
