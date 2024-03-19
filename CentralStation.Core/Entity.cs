namespace CentralStation.Core;

public interface IEntity<TKey>
{
    public TKey Id { get; set; }
}

public class Entity<TKey> : IEntity<TKey>
{
    public TKey Id { get; set; } = default!;
}

public class Entity : Entity<int>
{
}
