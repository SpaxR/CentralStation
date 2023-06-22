using System.Reflection;
using CentralStation.Attributes;

namespace CentralStation.Startup;

public static class StartupExtensions
{
	public static readonly Assembly[] Assemblies =
		Directory.EnumerateFiles(
				Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!,
				nameof(CentralStation) + "*.dll",
				SearchOption.TopDirectoryOnly
			)
			.Select(Assembly.LoadFrom)
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

			services.Add(new ServiceDescriptor(implementationType, implementationType, attribute.Lifetime));

			foreach (var interfaceType in implementationType.GetInterfaces())
			{
				Console.WriteLine("\tas " + interfaceType);
				services.Add(new ServiceDescriptor(interfaceType, implementationType, attribute.Lifetime));
			}
		}
	}


}
