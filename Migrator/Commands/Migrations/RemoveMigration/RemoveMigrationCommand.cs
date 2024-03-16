using Migrator.Infrastructure;
using Spectre.Console.Cli;

namespace Migrator.Commands.Migrations.RemoveMigration;

public class RemoveMigrationCommand : AsyncCommand<RemoveMigrationSettings>
{
    private readonly IMigrationService _service;


    public RemoveMigrationCommand(IMigrationService service) => _service = service;

    /// <inheritdoc />
    public override Task<int> ExecuteAsync(CommandContext context, RemoveMigrationSettings settings)
    {
        return _service
            .RemoveMigrationAsync(settings)
            .ContinueWith(_ => 0);
    }
}
