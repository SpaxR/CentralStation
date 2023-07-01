namespace CentralStation.Infrastructure;

/// <summary>
/// Represents a strongly Typed Repository
/// </summary>
/// <typeparam name="TEntity">Type of Entity</typeparam>
/// <typeparam name="TKey">Type of Entities Id</typeparam>
public interface IRepository<TEntity, TKey>
	where TEntity : class, IEntity<TKey>
{
	/// <summary>
	/// Gets an Entity from Database
	/// </summary>
	/// <param name="id">Id of the Entity</param>
	/// <returns>Instance of an Entity</returns>
	TEntity Get(TKey id);

	/// <summary>
	/// Gets an <see cref="IQueryable{T}"/> to query multiple Entities
	/// </summary>
	/// <returns><see cref="IQueryable{T}"/>-Instance</returns>
	IQueryable<TEntity> GetAll();

	/// <summary>
	/// Inserts a new or updates an existing Entity
	/// </summary>
	/// <param name="entity">Entity to Upsert</param>
	void InsertOrUpdate(TEntity entity);

	/// <summary>
	/// Deletes the Entity with the given Id
	/// </summary>
	/// <param name="id">Id of the Entity to be deleted</param>
	void Delete(TKey id);

	/// <summary>
	/// Deletes the given Entity
	/// </summary>
	/// <param name="entity">Entity to delete</param>
	void Delete(TEntity entity);

	/// <summary>
	/// Saves all pending Changes
	/// </summary>
	void SaveChanges();
}
/// <inheritdoc />
public interface IRepository<TEntity> : IRepository<TEntity, int>
	where TEntity : class, IEntity<int>

{
}
