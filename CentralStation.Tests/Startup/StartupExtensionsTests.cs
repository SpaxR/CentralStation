using System.Reflection;
using CentralStation.Attributes;
using Microsoft.Extensions.DependencyInjection;
using ServiceLifetime = CentralStation.Attributes.ServiceLifetime;

namespace CentralStation.Startup;

public class StartupExtensionsTests : UnitTestBase
{
	private static Assembly TestAssembly => typeof(StartupExtensionsTests).Assembly;

	public class Assemblies : StartupExtensionsTests
	{
		[Fact]
		public void Assemblies_contains_all_dll_files_in_root_folder_excluding_tests()
		{
			var expectation = Directory.EnumerateFiles(
					Directory.GetCurrentDirectory(),
					"*.dll",
					SearchOption.TopDirectoryOnly)
				.Where(file => Path.GetFileName(file).Contains(nameof(CentralStation)))
				.Where(file => !Path.GetFileName(file).Contains("test", StringComparison.OrdinalIgnoreCase))
				.OrderBy(f => f);

			var sut = StartupExtensions.Assemblies
				.Select(s => s.Location)
				.OrderBy(s => s);

			Assert.Equivalent(expectation, sut);
		}
	}

	public class AddServicesByConventionTests : StartupExtensionsTests
	{

		[Theory]
		[InlineData(typeof(TestDependencyClass))]
		[InlineData(typeof(TestSingletonClass))]
		[InlineData(typeof(TestScopedClass))]
		[InlineData(typeof(TestTransientClass))]
		public void Adds_Services_with_DependencyAttributes(Type expectation)
		{
			var services = new ServiceCollection();

			var result = services.AddServicesByConvention(TestAssembly);

			Assert.Contains(result, service => service.ServiceType == expectation && service.ImplementationType == expectation);
		}

		[Fact]
		public void Adds_Services_with_implemented_interface()
		{
			var services = new ServiceCollection();

			var result = services.AddServicesByConvention(TestAssembly);

			Assert.Contains(result, service =>
				service.ServiceType == typeof(ITestInterface) &&
				service.ImplementationType == typeof(TestClassWithInterface));
		}

	}

}
[Dependency(ServiceLifetime.Transient)]
class TestDependencyClass
{
}
[SingletonDependency]
class TestSingletonClass
{
}
[ScopedDependency]
class TestScopedClass
{
}
[TransientDependency]
class TestTransientClass
{
}
[TransientDependency]
class TestClassWithInterface : ITestInterface
{
}
interface ITestInterface
{
}
