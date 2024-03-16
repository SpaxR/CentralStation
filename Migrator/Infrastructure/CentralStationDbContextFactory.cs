using System.Data.Common;
using CentralStation.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Spectre.Console;

namespace Migrator.Infrastructure;

public class CentralStationDbContextFactory : IDesignTimeDbContextFactory<CentralStationDbContext>
{
    /// <inheritdoc />
    public CentralStationDbContext CreateDbContext(string[] args)
    {
        if (args.Length == 0 || string.IsNullOrEmpty(args[0]))
            throw new Exception("Missing ConnectionString");

        var options = new DbContextOptionsBuilder<CentralStationDbContext>()
            .UseSqlServer(args.First())
            .AddInterceptors(new ConnectionInterceptor());


        return new CentralStationDbContext(options.Options);
    }

    private class ConnectionInterceptor : IDbConnectionInterceptor
    {
        private static readonly ManualResetEventSlim Loading = new();

        /// <inheritdoc />
        public ValueTask<InterceptionResult> ConnectionOpeningAsync(
            DbConnection connection,
            ConnectionEventData eventData,
            InterceptionResult result,
            CancellationToken cancellationToken = new())
        {
            Loading.Reset();
            Task.Run(() =>
            {
                return AnsiConsole.Status().Spinner != null
                    ? Task.CompletedTask
                    : AnsiConsole.Status()
                        .StartAsync("Connecting...", _ =>
                        {
                            Loading.Wait(cancellationToken);
                            return Task.CompletedTask;
                        });
            }, cancellationToken);

            return ValueTask.FromResult(result);
        }


        /// <inheritdoc />
        public Task ConnectionOpenedAsync(
            DbConnection connection,
            ConnectionEndEventData eventData,
            CancellationToken cancellationToken = new())
        {
            Loading.Set();
            return Task.CompletedTask;
        }

        /// <inheritdoc />
        public Task ConnectionFailedAsync(
            DbConnection connection,
            ConnectionErrorEventData eventData,
            CancellationToken cancellationToken = new())
        {
            Loading.Set();
            return Task.CompletedTask;
        }
    }
}
