using System.Reflection;

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
}
