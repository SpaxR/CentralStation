using System.ComponentModel;
using System.Diagnostics;
using System.Reflection;
using CentralStation.EFCore;
using Migrator.Infrastructure;

namespace Migrator;

public static class Helper
{
    public static string Description<T>(this T obj)
        where T : Enum
    {
        Debug.Assert(obj != null);

        var type = typeof(T);
        var member = type.GetMember(obj.ToString()).Single();
        var attribute = member.GetCustomAttribute<DescriptionAttribute>();
        return attribute?.Description ?? obj.ToString();
    }

    public static string FindProjectDirectory<T>()
    {
        var assemblyName = typeof(T).Assembly.GetName().Name!;

        var rootDirectory = new DirectoryInfo(Directory.GetCurrentDirectory());

        while (!rootDirectory.EnumerateFiles("*.sln").Any())
        {
            rootDirectory = rootDirectory.Parent ?? throw new Exception("Could not find sln-file");
        }

        var targetProjectFile = rootDirectory
            .GetFiles($"{assemblyName}.csproj", SearchOption.AllDirectories)
            .SingleOrDefault()
            ?? throw new Exception("Could not find csproj-File of " + assemblyName);

        return targetProjectFile.DirectoryName!;
    }

    public static CentralStationDbContext CreateDesignTimeDbContext(string?[] args)
    {
        var connectionString = args.FirstOrDefault() != null
            ? args[0]
            : AppSettingsService.GetConnectionString();

        return new CentralStationDbContextFactory().CreateDbContext([connectionString]);
    }
}
