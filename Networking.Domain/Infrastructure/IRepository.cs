namespace CentralStation.Networking.Infrastructure;

public interface IRepository<TEntity, TKey>
{
	IQueryable<TEntity> GetAll();

	TEntity Get(TKey key);

	TKey Insert(TEntity entity);
}
