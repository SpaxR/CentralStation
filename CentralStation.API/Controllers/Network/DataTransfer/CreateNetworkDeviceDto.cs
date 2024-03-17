using AutoMapper;
using CentralStation.Application.Networking.Entities;

namespace CentralStation.API.Controllers.Network.DataTransfer;

[AutoMap(typeof(NetworkDevice), ReverseMap = true)]
public class CreateNetworkDeviceDto
{
    public string? DisplayName { get; set; }
    public int NetworkId { get; init; }
    public int Address { get; init; }
}
