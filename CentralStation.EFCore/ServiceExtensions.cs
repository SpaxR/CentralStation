using CentralStation.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CentralStation.EFCore;

public static class ServiceExtensions
{
    public static IServiceCollection AddEntityFrameworkCore
        (this IServiceCollection services, IConfiguration configuration)
    {
        services.AddGenericRepository();
        services.AddDbContext(configuration);

        return services;
    }

    private static void AddDbContext(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<CentralStationDbContext>(options =>
        {
            var connectionString =
                configuration.GetConnectionString(AppConstants.ApplicationName)
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
    }

    private static void AddGenericRepository(this IServiceCollection services)
    {
        // Every <TEntity> of Properties in DbContext with Type DbSet<TEntity>
        var entities = typeof(CentralStationDbContext)
            .GetProperties()
            .Select(info => info.PropertyType)
            .Where(type => type.IsGenericType)
            .Where(type => type.GetGenericTypeDefinition().IsAssignableTo(typeof(DbSet<>)))
            .Select(type => type.GetGenericArguments()[0])
            .Where(type =>
                type.IsAssignableTo(typeof(Entity)) ||
                type.IsGenericType && type.GetGenericTypeDefinition().IsAssignableTo(typeof(Entity<>))
            );

        foreach (var entity in entities)
        {
            // TPrimaryKey of IEntity<TPrimaryKey>
            var keyType = entity.GetInterfaces()
                .First(iFace => iFace.IsGenericType && iFace.GetGenericTypeDefinition() == typeof(IEntity<>))
                .GenericTypeArguments[0];

            var interfaceType = typeof(IRepository<,>)
                .MakeGenericType(entity, keyType);
            var repositoryType = typeof(GenericRepository<,>)
                .MakeGenericType(entity, keyType);

            Console.WriteLine($"Registering {repositoryType.ShortDisplayName()} as {interfaceType.ShortDisplayName()}");
            services.AddTransient(interfaceType, repositoryType);

            if (keyType == typeof(int))
            {
                var simpleInterface = typeof(IRepository<>)
                    .MakeGenericType(entity);
                var simpleRepository = typeof(GenericRepository<>)
                    .MakeGenericType(entity);

                Console.WriteLine(
                    $"Registering {simpleRepository.ShortDisplayName()} as {simpleInterface.ShortDisplayName()}");
                services.AddTransient(simpleInterface, simpleRepository);
            }
        }
    }
}
