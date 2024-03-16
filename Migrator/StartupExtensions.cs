using System.Diagnostics.CodeAnalysis;
using CentralStation.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.SqlServer.Design.Internal;
using Microsoft.EntityFrameworkCore.SqlServer.Storage.Internal;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Json;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.DependencyInjection;
using Migrator.Infrastructure;

namespace Migrator;

public static class StartupExtensions
{
    public static IServiceCollection AddMigratorServices(this IServiceCollection services)
    {
        services.AddSingleton<IDatabaseService, DatabaseService>();
        services.AddSingleton<IMigrationService, MigrationService>();
        services.AddSingleton<IDesignTimeDbContextFactory<CentralStationDbContext>, CentralStationDbContextFactory>();
        return services;
    }

    [SuppressMessage("Usage", "EF1001:Internal EF Core API usage.")]
    public static IServiceCollection AddDesignTimeServices<TContext>(this IServiceCollection services, TContext context)
        where TContext : DbContext
    {
        services.AddSingleton(context);

        services.AddScoped<AnnotationCodeGeneratorDependencies>();
        services.AddScoped<TypeMappingSourceDependencies>();
        services.AddScoped<ValueConverterSelectorDependencies>();
        services.AddScoped<RelationalTypeMappingSourceDependencies>();
        services.AddSingleton<IValueConverterSelector, ValueConverterSelector>();
        services.AddSingleton<ITypeMappingSource, SqlServerTypeMappingSource>();
        services.AddSingleton<IAnnotationCodeGenerator, SqlServerAnnotationCodeGenerator>();
        services.AddSingleton<IJsonValueReaderWriterSource, JsonValueReaderWriterSource>();
        services.AddSingleton<JsonValueReaderWriterSourceDependencies>();
        services.AddEntityFrameworkDesignTimeServices();
        services.AddDbContextDesignTimeServices(context);

        return services;
    }
}
