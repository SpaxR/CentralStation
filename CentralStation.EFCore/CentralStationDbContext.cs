using CentralStation.Core;
using CentralStation.Domain.Networking.Entities;
using Microsoft.EntityFrameworkCore;

// ReSharper disable ReturnTypeCanBeEnumerable.Global

namespace CentralStation.EFCore;

public class CentralStationDbContext : DbContext
{
    public DbSet<NetworkEntity> Networks => Set<NetworkEntity>();
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
