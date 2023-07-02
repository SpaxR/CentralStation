using CentralStation.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CentralStation.Infrastructure;

public static class InfrastructureStartupExtensions
{
	public const string ConnectionStringIdentifier = "Default";

	public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
	{
		return services
				.AddTransient(typeof(IRepository<,>), typeof(GenericRepository<,>))
				.AddDatabase(configuration)
			;
	}

	private static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
	{
		var connectionString = configuration.GetConnectionString(ConnectionStringIdentifier);

		if (string.IsNullOrWhiteSpace(connectionString))
		{
			services.AddDbContext<CentralStationDBContext>(options => options.UseInMemoryDatabase(nameof(CentralStation)));
		}
		else
		{
			services.AddSqlServer<CentralStationDBContext>(connectionString);
		}

		return services;
	}

	public static void InitializeInfrastructure(this IServiceProvider provider)
	{
		var logger = provider.GetRequiredService<ILoggerFactory>().CreateLogger(nameof(InfrastructureStartupExtensions));

		using var scope = provider.CreateScope();

		var dbContext = scope.ServiceProvider.GetRequiredService<CentralStationDBContext>();
		logger.LogInformation("Using Database {DbType}", dbContext.Database.ProviderName);

		if (dbContext.Database.IsRelational())
		{
			dbContext.Database.Migrate();
		}
	}

}
