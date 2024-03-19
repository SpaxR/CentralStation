namespace CentralStation.Core;

public interface IRepository<TEntity> : IRepository<TEntity, int>
    where TEntity : Entity
{
}

public interface IRepository<TEntity, TPrimaryKey>
    where TEntity : Entity<TPrimaryKey>
{
    IQueryable<TEntity> GetAll();

    TEntity? Get(TPrimaryKey key);
    ValueTask<TEntity?> GetAsync(TPrimaryKey key);

    TPrimaryKey Insert(TEntity entity);
    ValueTask<TPrimaryKey> InsertAsync(TEntity entity);

    void Update(TEntity entity);

    TEntity Delete(TPrimaryKey key);
    void Delete(TEntity entity);
}
