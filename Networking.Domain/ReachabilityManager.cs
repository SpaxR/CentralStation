using System.Net;
using System.Net.NetworkInformation;
using CentralStation.Attributes;
using CentralStation.Infrastructure;

namespace CentralStation.Networking;

[TransientDependency]
public class ReachabilityManager : IReachabilityManager
{
	private readonly IRepository<NetworkDevice, Guid> _devices;
	public ReachabilityManager(IRepository<NetworkDevice, Guid> devices)
	{
		_devices = devices;
	}

	/// <inheritdoc />
	public async Task<bool> PingDevice(NetworkDevice device)
	{
		using var ping = new Ping();

		var result = await ping.SendPingAsync(IPAddress.Parse(device.Address));

		return result.Status == IPStatus.Success;
	}
	/// <inheritdoc />
	public async IAsyncEnumerable<(Guid device, bool result)> PingDevices(params Guid[] ids)
	{
		var devices = _devices.GetAll()
			.Where(d => ids.Contains(d.Id));

		foreach (var device in devices)
		{
			yield return (device.Id, await PingDevice(device));
		}
	}
}
