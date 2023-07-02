using CentralStation.Attributes;
using CentralStation.Infrastructure;
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
	private readonly IRepository<NetworkDevice, Guid> _devices;

	public NetworkDeviceService(IReachabilityManager reachability, IRepository<NetworkDevice, Guid> devices)
	{
		_reachability = reachability;
		_devices      = devices;
	}

	/// <inheritdoc />
	public IEnumerable<NetworkDeviceModel> GetAll()
	{
		return _devices.GetAll().Select(device => new NetworkDeviceModel()
		{
			Id      = device.Id,
			Address = device.Address
		});
	}

	public Task<bool> PingDeviceAsync(Guid id)
	{
		var device = _devices.Get(id);

		return _reachability.PingDevice(device);
	}
}
