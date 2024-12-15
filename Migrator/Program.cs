using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Migrator;
using Migrator.Commands.Interactive;
using Migrator.Commands.Migrations.CreateMigration;
using Migrator.Commands.Migrations.RemoveMigration;
using Migrator.Commands.UpdateDatabase;
using Migrator.Infrastructure;
using Spectre.Console;
using Spectre.Console.Cli;

Console.OutputEncoding = Encoding.UTF8;

var dbContext = Helper.CreateDesignTimeDbContext(args);

var services = new ServiceCollection()
    .AddMigratorServices()
    .AddDesignTimeServices(dbContext);

var app = new CommandApp<InteractiveCommand>(new SpectreTypeRegistrar(services));

app.Configure(config =>
{
    config.SetApplicationName("CentralStation-Migrator");
    config.SetApplicationVersion("Version 0.0.0.0");

    config.ValidateExamples();

    config.AddCommand<UpdateDatabaseCommand>("update")
        .WithDescription("Migrates the Database")
        .WithExample("update")
        .WithExample("update", DateTime.Now.ToString("yyyyMMddHHmmss"))
        ;

    config.AddCommand<CreateMigrationCommand>("create")
        .WithDescription("Creates a new Migration")
        .WithExample("create", "\"Done some Stuff\"");

    config.AddCommand<RemoveMigrationCommand>("remove")
        .WithDescription("Removes the latest Migration");

    config.SetExceptionHandler((exception, _) =>
    {
        AnsiConsole.MarkupLineInterpolated($"[yellow]{exception.Message}[/]");
        AnsiConsole.MarkupLineInterpolated($"[grey]{exception.StackTrace}[/]");
    });
});

AnsiConsole.Write(new FigletText("Migrator"));

await app.RunAsync(args);

AnsiConsole.MarkupLine("[yellow]kthxbye[/]");
