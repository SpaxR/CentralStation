using System.ComponentModel;
using Migrator.Commands.Migrations;
using Spectre.Console.Cli;

namespace Migrator.Commands.UpdateDatabase;

public class UpdateDatabaseSettings : MigratorCommandSettingsBase
{
    [Description("Target-Migration, defaults to latest")]
    [DefaultValue("latest")]
    [CommandArgument(0, "[timestamp]")]
    public string? TargetMigration { get; init; }

    [Description("Alternative Connection-String")]
    [CommandOption("--cs | --connection-string")]
    public string? ConnectionString { get; set; }
}
