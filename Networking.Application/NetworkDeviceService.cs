using System.Net;
using CentralStation.Attributes;
using CentralStation.Networking.Models;

namespace CentralStation.Networking;

public interface INetworkDeviceService
{
	IEnumerable<NetworkDeviceModel> GetAll();
	Task<bool> PingDeviceAsync(Guid id);
}

[ScopedDependency]
public class NetworkDeviceService : INetworkDeviceService
{
	private readonly IReachabilityManager _reachability;
	public NetworkDeviceService(IReachabilityManager reachability)
	{
		_reachability = reachability;
	}

	/// <inheritdoc />
	public IEnumerable<NetworkDeviceModel> GetAll()
	{
		// TODO Implement Repositories
		yield return new NetworkDeviceModel
		{
			Id              = Guid.Empty,
			HostName        = "HostName",
			UserDefinedName = "UserDefined",
			Address         = IPAddress.Parse("192.168.178.10")
		};
	}

	public Task<bool> PingDeviceAsync(Guid id)
	{
		// TODO Implement Repositories
		var device = new NetworkDevice(id, "127.0.0.1");
		return _reachability.PingDevice(device);
	}
}
