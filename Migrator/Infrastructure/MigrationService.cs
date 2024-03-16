using CentralStation.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Migrator.Commands.Migrations.CreateMigration;
using Migrator.Commands.Migrations.RemoveMigration;
using Spectre.Console;

namespace Migrator.Infrastructure;

public interface IMigrationService
{
    Task<IEnumerable<Migration>> GetMigrations();

    Task CreateMigrationAsync(CreateMigrationSettings settings);
    Task RemoveMigrationAsync(RemoveMigrationSettings settings);
}

public record Migration(string Name, bool IsPending);

public class MigrationService : IMigrationService
{
    private readonly CentralStationDbContext _context;
    private readonly IMigrationsScaffolder _scaffold;

    public MigrationService(CentralStationDbContext context, IMigrationsScaffolder scaffold)
    {
        _context = context;
        _scaffold = scaffold;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<Migration>> GetMigrations()
    {
        var pending =
            (await _context.Database.GetPendingMigrationsAsync())
            .Select(m => new Migration(m, true))
            .Reverse();
        var applied =
            (await _context.Database.GetAppliedMigrationsAsync())
            .Select(m => new Migration(m, false))
            .Reverse();

        return pending
            .Concat(applied)
            .Append(new Migration("0", false));
    }

    /// <inheritdoc />
    public Task CreateMigrationAsync(CreateMigrationSettings settings)
    {
        AnsiConsole.WriteLine("Creating Migration");

        if (!_context.Database.HasPendingModelChanges() && !settings.ForceCreation)
        {
            if (settings.Quiet)
                return Task.CompletedTask;

            var shouldContinue = AnsiConsole.Confirm("No changes detected, force creation?", false);

            if (!shouldContinue)
                return Task.CompletedTask;
        }


        var migration = _scaffold.ScaffoldMigration(settings.Name, nameof(CentralStation));

        AnsiConsole.WriteLine("Created Migration");

        var files = _scaffold.Save(Helper.FindProjectDirectory<CentralStationDbContext>(), migration, null);

        AnsiConsole.WriteLine("Saved File " + Path.GetFileName(files.MigrationFile));

        return Task.CompletedTask;
    }

    /// <inheritdoc />
    public Task RemoveMigrationAsync(RemoveMigrationSettings settings)
    {
        AnsiConsole.WriteLine("Removing Migration");

        var lastMigration = _context.Database.GetMigrations().LastOrDefault();

        if (lastMigration == null)
        {
            AnsiConsole.WriteLine("No Migrations found");
            return Task.CompletedTask;
        }

        if (!settings.Quiet && !AnsiConsole.Confirm("Remove Migration " + lastMigration + "?"))
        {
            return Task.CompletedTask;
        }

        _scaffold.RemoveMigration(
            Helper.FindProjectDirectory<CentralStationDbContext>(),
            rootNamespace: null,
            force: true,
            language: null
        );

        AnsiConsole.WriteLine("Successfully removed Migration");

        return Task.CompletedTask;
    }
}
