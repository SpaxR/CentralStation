using System.ComponentModel;
using Spectre.Console.Cli;

namespace Migrator.Commands.Migrations;

public class MigratorCommandSettingsBase : CommandSettings
{
    [Description("Suppresses Messages")]
    [DefaultValue(false)]
    [CommandOption("-q | --quiet")]
    public bool Quiet { get; set; }

    [Description("Logs more Messages")]
    [DefaultValue(false)]
    [CommandOption("-v | --verbose")]
    public bool Verbose { get; set; }

    [Description("Stops and confirms actions")]
    [CommandOption("-i | --interactive")]
    public bool? Interactive { get; set; }
}
