using CentralStation.Application.Networking.Entities;
using CentralStation.Core;
using Microsoft.EntityFrameworkCore;

namespace CentralStation.EFCore;

public class CentralStationDbContext : DbContext
{
    public DbSet<Network> Networks => Set<Network>();
    public DbSet<NetworkDevice> NetworkDevices => Set<NetworkDevice>();

    /// <inheritdoc />
    protected CentralStationDbContext()
    {
    }

    /// <inheritdoc />
    public CentralStationDbContext(DbContextOptions options) : base(options)
    {
    }

    /// <inheritdoc />
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var entityTypes = modelBuilder.Model
            .GetEntityTypes()
            .Where(type => type.ClrType.IsAssignableTo(typeof(Entity<>)))
            .Select(type => modelBuilder.Entity(type.ClrType));

        foreach (var entityType in entityTypes)
        {
            entityType.Property(nameof(Entity.Id))
                .ValueGeneratedOnAdd();
        }
    }
}
