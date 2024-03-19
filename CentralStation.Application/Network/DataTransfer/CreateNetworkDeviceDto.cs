using AutoMapper;
using CentralStation.Domain.Networking.Entities;

namespace CentralStation.Application.Network.DataTransfer;

[AutoMap(typeof(NetworkDevice), ReverseMap = true)]
public class CreateNetworkDeviceDto
{
    public string? DisplayName { get; set; }
    public int NetworkId { get; init; }
    public int Address { get; init; }
}
