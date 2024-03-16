using Migrator.Infrastructure;
using Spectre.Console.Cli;

namespace Migrator.Commands.Migrations.CreateMigration;

public class CreateMigrationCommand : AsyncCommand<CreateMigrationSettings>
{
    private readonly IMigrationService _service;

    public CreateMigrationCommand(IMigrationService service) => _service = service;

    /// <inheritdoc />
    public override Task<int> ExecuteAsync(CommandContext context, CreateMigrationSettings settings)
    {
        return _service
            .CreateMigrationAsync(settings)
            .ContinueWith(_ => 0);
    }
}
