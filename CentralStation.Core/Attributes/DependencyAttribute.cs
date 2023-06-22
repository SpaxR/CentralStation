using Microsoft.Extensions.DependencyInjection;

namespace CentralStation.Attributes;

public class DependencyAttribute : Attribute
{
	public DependencyAttribute(ServiceLifetime lifetime) => Lifetime = lifetime;

	public ServiceLifetime Lifetime { get; set; }
}
public class SingletonDependency : DependencyAttribute
{
	/// <inheritdoc />
	public SingletonDependency() : base(ServiceLifetime.Singleton) {}
}
public class ScopedDependency : DependencyAttribute
{
	/// <inheritdoc />
	public ScopedDependency() : base(ServiceLifetime.Scoped) {}
}
public class TransientDependency : DependencyAttribute
{
	/// <inheritdoc />
	public TransientDependency() : base(ServiceLifetime.Transient) {}
}
