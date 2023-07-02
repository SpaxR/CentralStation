using CentralStation.Infrastructure;

namespace CentralStation.Networking;

public class NetworkDevice : IEntity<Guid>
{
	public NetworkDevice(Guid id, string address)
	{
		Id      = id;
		Address = address;
	}

	public Guid    Id              { get; set; }
	public string  Address         { get; set; }
	public string? HostName        { get; set; }
	public string? UserDefinedName { get; set; }
}
