using Microsoft.Extensions.DependencyInjection;
using MudBlazor.Services;

namespace CentralStation.Networking.Web;

public static class StartupExtensions
{
	public static IServiceCollection AddNetworking(this IServiceCollection services)
	{
		services.AddMudServices();
		return services;
	}
}
