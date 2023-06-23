using CentralStation.Attributes;

namespace CentralStation.Networking;

[SingletonDependency]
public class ReachabilityManager : IReachabilityManager
{
	/// <inheritdoc />
	public async Task<bool> PingDevice(NetworkDevice device)
	{
		// TODO Use actual Pinging
		Console.WriteLine("Pinging " + device.Address);
		await Task.Delay(500);
		return new Random().Next(2) == 0;
	}
	/// <inheritdoc />
	public async IAsyncEnumerable<(Guid device, bool result)> PingDevices(params Guid[] ids)
	{
		// TODO Implement Repositories
		var devices = ids.Select(id => new NetworkDevice(id, "127.0.0.1"));

		foreach (var device in devices)
		{
			yield return (device.Id, await PingDevice(device));
		}
	}
}
