using Microsoft.EntityFrameworkCore;

namespace CentralStation.EFCore;

public class CentralStationDbContext : DbContext
{
    /// <inheritdoc />
    protected CentralStationDbContext()
    {
    }

    /// <inheritdoc />
    public CentralStationDbContext(DbContextOptions options) : base(options)
    {
    }
}
