using Microsoft.EntityFrameworkCore;

namespace CentralStation.EFCore;

public class CentralStationDBContext : DbContext
{
	public DbSet<TestEntity> Entities => Set<TestEntity>();

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
		modelBuilder.Entity<TestEntity>()
			.ToTable("TestEntities", "central_station");
	}

}
