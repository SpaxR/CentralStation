using CentralStation.Core;

namespace CentralStation.EFCore;

public class GenericRepository<TEntity> : GenericRepository<TEntity, int>, IRepository<TEntity>
    where TEntity : Entity
{
    /// <inheritdoc />
    public GenericRepository(CentralStationDbContext context) : base(context)
    {
    }
}

public class GenericRepository<TEntity, TPrimaryKey> : IRepository<TEntity, TPrimaryKey>
    where TEntity : Entity<TPrimaryKey>
{
    private readonly CentralStationDbContext _context;

    public GenericRepository(CentralStationDbContext context)
    {
        _context = context;
    }

    public bool AutoSave { get; set; } = true;

    /// <inheritdoc />
    public IQueryable<TEntity> GetAll() => _context.Set<TEntity>();

    /// <inheritdoc />
    public TEntity? Get(TPrimaryKey key) => _context.Set<TEntity>().Find(key);

    /// <inheritdoc />
    public ValueTask<TEntity?> GetAsync(TPrimaryKey key) => _context.Set<TEntity>().FindAsync(key);

    /// <inheritdoc />
    public TPrimaryKey Insert(TEntity entity)
    {
        entity.Id = default!;

        _context.Set<TEntity>().Add(entity);

        if (AutoSave)
            _context.SaveChanges();

        return entity.Id;
    }

    /// <inheritdoc />
    public async ValueTask<TPrimaryKey> InsertAsync(TEntity entity)
    {
        entity.Id = default!;

        await _context.Set<TEntity>().AddAsync(entity);

        if (AutoSave)
            await _context.SaveChangesAsync();

        return entity.Id;
    }

    /// <inheritdoc />
    public void Update(TEntity entity)
    {
        _context.Set<TEntity>().Update(entity);

        if (AutoSave)
            _context.SaveChanges();
    }

    /// <inheritdoc />
    public TEntity Delete(TPrimaryKey key)
    {
        var entity = Get(key) ?? throw new KeyNotFoundException($"Entity with Key {key} not found");

        _context.Set<TEntity>().Remove(entity);

        if (AutoSave)
            _context.SaveChanges();

        return entity;
    }

    /// <inheritdoc />
    public void Delete(TEntity entity)
    {
        _context.Set<TEntity>().Remove(entity);

        if (AutoSave)
            _context.SaveChanges();
    }
}
