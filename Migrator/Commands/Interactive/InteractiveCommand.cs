using System.Collections.Immutable;
using System.ComponentModel;
using JetBrains.Annotations;
using Migrator.Commands.Migrations;
using Migrator.Commands.Migrations.CreateMigration;
using Migrator.Commands.Migrations.RemoveMigration;
using Migrator.Commands.UpdateDatabase;
using Migrator.Infrastructure;
using Spectre.Console;
using Spectre.Console.Cli;

namespace Migrator.Commands.Interactive;

public enum MigratorAction
{
    [Description("Migrate Database")] Migrate,
    [Description("Create Migration")] Create,
    [Description("Remove Migration")] Remove,
    [Description("Exit")] Quit,
}

[UsedImplicitly]
internal sealed class InteractiveCommand : AsyncCommand<MigratorCommandSettingsBase>
{
    private readonly IMigrationService _migration;
    private readonly IDatabaseService _database;

    public InteractiveCommand(IMigrationService migration, IDatabaseService database)
    {
        _migration = migration;
        _database = database;
    }

    /// <inheritdoc />
    public override async Task<int> ExecuteAsync(CommandContext context, MigratorCommandSettingsBase settingsSettings)
    {
        var selection = AnsiConsole.Prompt(new SelectionPrompt<MigratorAction>()
            .AddChoices(Enum.GetValues<MigratorAction>())
            .UseConverter(Helper.Description)
        );

        await (selection switch
        {
            MigratorAction.Migrate => HandleUpdateDatabase(settingsSettings),
            MigratorAction.Create => HandleCreateMigration(settingsSettings),
            MigratorAction.Remove => HandleRemoveMigration(settingsSettings),
            MigratorAction.Quit => Task.CompletedTask,
            _ => throw new ArgumentOutOfRangeException(null, "Function not implemented")
        });

        return 0;
    }

    private Task HandleCreateMigration(MigratorCommandSettingsBase settingsSettings)
    {
        var name = AnsiConsole.Ask<string>("Name der Migration >");

        return _migration.CreateMigrationAsync(new CreateMigrationSettings
        {
            Name = name,
            Interactive = settingsSettings.Interactive ?? true,
            Quiet = settingsSettings.Quiet,
            Verbose = settingsSettings.Verbose,
        });
    }

    private Task HandleRemoveMigration(MigratorCommandSettingsBase settings)
    {
        return _migration.RemoveMigrationAsync(new RemoveMigrationSettings
        {
            Quiet = settings.Quiet,
            Interactive = settings.Interactive ?? true,
            Verbose = settings.Verbose,
        });
    }

    private async Task HandleUpdateDatabase(MigratorCommandSettingsBase settings)
    {
        var migrations = (await _migration.GetMigrations()).ToImmutableArray();
        var latestMigration = migrations.FirstOrDefault(m => !m.IsPending);

        if (migrations.Length == 1)
        {
            AnsiConsole.WriteLine("No migrations found to apply");
            return;
        }

        var selectedMigration = AnsiConsole.Prompt(new SelectionPrompt<Migration>()
            .AddChoices(migrations)
            .UseConverter(m =>
            {
                if (m == latestMigration)
                {
                    return $"*{m.Name}*";
                }

                if (m.IsPending)
                {
                    return m.Name + " (pending)";
                }

                return m.Name;
            })
        );

        if (selectedMigration == latestMigration)
        {
            AnsiConsole.WriteLine("Migration already applied");
            return;
        }

        var connectionString = AnsiConsole.Prompt(
            new TextPrompt<string?>("Modify ConnectionString?")
                .DefaultValue(null)
                .WithConverter(m => m ?? "Use AppSettings"));

        await _database.UpdateDatabaseAsync(new UpdateDatabaseSettings
        {
            Quiet = settings.Quiet,
            Interactive = settings.Interactive ?? true,
            Verbose = settings.Verbose,
            ConnectionString = connectionString,
            TargetMigration = selectedMigration.Name,
        });
    }
}
