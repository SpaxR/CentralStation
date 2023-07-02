using System.Net;

namespace CentralStation.Networking.Models;

public class NetworkDeviceModel
{
	public Guid    Id              { get; set; }
	public string? Address         { get; set; }
	public string  HostName        { get; set; } = string.Empty;
	public string  UserDefinedName { get; set; } = string.Empty;
}
