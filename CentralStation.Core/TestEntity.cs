using CentralStation.Infrastructure;

namespace CentralStation;

public class TestEntity : IEntity<Guid>
{
	/// <inheritdoc />
	public Guid Id
	{
		get;
		set;
	}

	public string ArbitraryString { get; set; } = string.Empty;
}
