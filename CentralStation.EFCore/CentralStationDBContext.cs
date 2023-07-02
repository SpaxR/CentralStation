using System.Diagnostics.CodeAnalysis;
using CentralStation.Networking;
using Microsoft.EntityFrameworkCore;
// ReSharper disable All

namespace CentralStation.EFCore;

[ExcludeFromCodeCoverage]
public class CentralStationDBContext : DbContext
{
	public DbSet<TestEntity>    TestEntities   => Set<TestEntity>();
	public DbSet<NetworkDevice> NetworkDevices => Set<NetworkDevice>();

	/// <inheritdoc />
	protected CentralStationDBContext()
	{
	}
	/// <inheritdoc />
	public CentralStationDBContext(DbContextOptions options) : base(options)
	{
	}

	/// <inheritdoc />
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.HasDefaultSchema("central_station");
	}
}
