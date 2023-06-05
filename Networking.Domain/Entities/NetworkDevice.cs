namespace Networking.Domain;

public class NetworkDevice
{
	public NetworkDevice(Guid id, string address)
	{
		Id      = id;
		Address = address;
	}

	public Guid    Id              { get; private set; }
	public string  Address         { get; set; }
	public string? HostName        { get; set; }
	public string? UserDefinedName { get; set; }
}
