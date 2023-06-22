using Microsoft.Extensions.DependencyInjection;

namespace CentralStation.Attributes;

public class DependencyAttributeTests : UnitTestBase
{
	[Theory]
	[InlineData(ServiceLifetime.Scoped)]
	[InlineData(ServiceLifetime.Singleton)]
	[InlineData(ServiceLifetime.Transient)]
	public void DependencyAttribute_sets_lifetime_to_lifetime_property(ServiceLifetime lifetime)
	{
		var sut = new DependencyAttribute(lifetime);

		Assert.Equal(lifetime, sut.Lifetime);
	}

	[Fact]
	public void TransientDependencyAttribute_sets_lifetime_to_Transient()
	{
		var sut = new TransientDependency();

		Assert.Equal(ServiceLifetime.Transient, sut.Lifetime);
	}

	[Fact]
	public void ScopedDependencyAttribute_sets_lifetime_to_Scoped()
	{
		var sut = new ScopedDependency();

		Assert.Equal(ServiceLifetime.Scoped, sut.Lifetime);
	}

	[Fact]
	public void SingletonDependencyAttribute_sets_lifetime_to_Singleton()
	{
		var sut = new SingletonDependency();

		Assert.Equal(ServiceLifetime.Singleton, sut.Lifetime);
	}
}
