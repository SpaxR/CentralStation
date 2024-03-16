using Migrator.Infrastructure;
using Spectre.Console.Cli;

namespace Migrator.Commands.UpdateDatabase;

public class UpdateDatabaseCommand : AsyncCommand<UpdateDatabaseSettings>
{
    private readonly IDatabaseService _service;

    public UpdateDatabaseCommand(IDatabaseService service) => _service = service;

    /// <inheritdoc />
    public override async Task<int> ExecuteAsync(CommandContext context, UpdateDatabaseSettings settings)
    {
        await _service.UpdateDatabaseAsync(settings);
        return 0;
    }
}
