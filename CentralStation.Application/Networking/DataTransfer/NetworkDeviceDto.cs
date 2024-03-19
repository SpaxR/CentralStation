using AutoMapper;
using CentralStation.Domain.Networking.Entities;

namespace CentralStation.Application.Networking;

[AutoMap(typeof(NetworkDevice))]
public class NetworkDeviceDto
{
    public int Id { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public int Address { get; set; }
    public int NetworkId { get; init; }
}
