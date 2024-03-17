using AutoMapper;
using CentralStation.Application.Networking.Entities;

namespace CentralStation.API.Controllers.Network.DataTransfer;

[AutoMap(typeof(NetworkDevice))]
public class NetworkDeviceDto
{
    public int Id { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public int Address { get; set; }
    public int NetworkId { get; init; }
}
