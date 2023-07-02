using System.Reflection;
using CentralStation.Attributes;
using MsServiceLifetime = Microsoft.Extensions.DependencyInjection.ServiceLifetime;
using ServiceLifetime = CentralStation.Attributes.ServiceLifetime;

namespace CentralStation.Startup;

public static class StartupExtensions
{
	public static readonly Assembly[] Assemblies = new[] { Assembly.GetExecutingAssembly().GetName() }
		.Concat(Assembly.GetExecutingAssembly().GetReferencedAssemblies())
		.Where(name => !(name.FullName.StartsWith("System") || name.FullName.StartsWith("Microsoft")))
		.Select(Assembly.Load)
		.ToArray();

	public static IServiceCollection AddServicesByConvention(this IServiceCollection services, params Assembly[] assemblies)
	{
		var types = assemblies.SelectMany(assembly => assembly.GetTypes());

		services.RegisterTypesWithDependencyAttribute(types);

		return services;
	}

	private static void RegisterTypesWithDependencyAttribute(this IServiceCollection services, IEnumerable<Type> types)
	{
		var definitions = types
			.Where(type => Attribute.IsDefined(type, typeof(DependencyAttribute)))
			.Select(type => (type, type.GetCustomAttributes<DependencyAttribute>().First()));

		foreach (var (implementationType, attribute) in definitions)
		{
			Console.WriteLine($"Registering Service: {implementationType} ({attribute.Lifetime})");

			services.Add(new ServiceDescriptor(implementationType, implementationType, attribute.Lifetime.AsMsServiceLifetime()));

			foreach (var interfaceType in implementationType.GetInterfaces())
			{
				Console.WriteLine("\tas " + interfaceType);
				services.Add(new ServiceDescriptor(interfaceType, implementationType, attribute.Lifetime.AsMsServiceLifetime()));
			}
		}
	}

	private static MsServiceLifetime AsMsServiceLifetime(this ServiceLifetime lifetime)
	{
		return lifetime switch
		{
			ServiceLifetime.Singleton => MsServiceLifetime.Singleton,
			ServiceLifetime.Scoped => MsServiceLifetime.Scoped,
			ServiceLifetime.Transient => MsServiceLifetime.Transient,
			_ => throw new ArgumentOutOfRangeException(nameof(lifetime), lifetime, null)
		};
	}
}
