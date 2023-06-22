namespace CentralStation.Networking;

public interface IReachabilityManager
{
	Task<bool> PingDevice(NetworkDevice device);

	IAsyncEnumerable<(Guid device, bool result)> PingDevices(params Guid[] ids);
}
