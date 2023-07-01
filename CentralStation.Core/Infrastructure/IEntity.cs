namespace CentralStation.Infrastructure;

/// <summary>
/// Represents an Entity, uniquely defined by an ID
/// </summary>
/// <typeparam name="TKey">Type of Id</typeparam>
public interface IEntity<TKey>
{
	public TKey Id { get; set; }
}
/// <inheritdoc />
public interface IEntity : IEntity<int>
{
}
