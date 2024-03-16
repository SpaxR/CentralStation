using System.ComponentModel;
using Spectre.Console.Cli;

namespace Migrator.Commands.Migrations.CreateMigration;

public class CreateMigrationSettings : MigratorCommandSettingsBase
{
    [Description("Name of Migration")]
    [CommandArgument(0, "<description>")]
    public string Name { get; set; } = string.Empty;

    [Description("Create a Migration, even if empty")]
    [CommandOption("-f | --force")]
    public bool ForceCreation { get; set; }
}
