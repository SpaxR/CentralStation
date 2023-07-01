using CentralStation.Infrastructure;

namespace CentralStation.EFCore;

public class GenericRepository<TEntity, TKey> : IRepository<TEntity, TKey>
	where TEntity : class, IEntity<TKey>
{
	private readonly CentralStationDBContext _context;

	public GenericRepository(CentralStationDBContext context) => _context = context;

	/// <inheritdoc />
	public TEntity Get(TKey id)
		=> _context.Find<TEntity>(id) ?? throw new KeyNotFoundException($"Entity with id {id} could not be found");

	/// <inheritdoc />
	public IQueryable<TEntity> GetAll()
		=> _context.Set<TEntity>().AsQueryable();

	/// <inheritdoc />
	public void InsertOrUpdate(TEntity entity)
		=> _context.Update(entity);

	/// <inheritdoc />
	public void Delete(TKey id) =>
		_context.Remove((new { Id = id } as TEntity)!);

	/// <inheritdoc />
	public void Delete(TEntity entity)
		=> _context.Remove(entity);

	/// <inheritdoc />
	public void SaveChanges()
		=> _context.SaveChanges();

}
