using Microsoft.EntityFrameworkCore.Migrations;
using Migrator.Commands.UpdateDatabase;
using Spectre.Console;

namespace Migrator.Infrastructure;

public interface IDatabaseService
{
    Task UpdateDatabaseAsync(UpdateDatabaseSettings settings);
}

public class DatabaseService : IDatabaseService
{
    private readonly IMigrator _migrator;

    public DatabaseService(IMigrator migrator) => _migrator = migrator;

    /// <inheritdoc />
    public Task UpdateDatabaseAsync(UpdateDatabaseSettings settings)
    {
        AnsiConsole.WriteLine("Updating Database");

        AnsiConsole.WriteLine("Migrating to Version " + settings.TargetMigration);

        _migrator.Migrate(settings.TargetMigration);

        AnsiConsole.WriteLine("Successfully Applied");

        return Task.CompletedTask;
    }
}
