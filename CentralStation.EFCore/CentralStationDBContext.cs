using Microsoft.EntityFrameworkCore;

namespace CentralStation.EFCore;

public class CentralStationDBContext : DbContext
{
	/// <inheritdoc />
	protected CentralStationDBContext()
	{
	}
	/// <inheritdoc />
	public CentralStationDBContext(DbContextOptions options) : base(options)
	{
	}

}
