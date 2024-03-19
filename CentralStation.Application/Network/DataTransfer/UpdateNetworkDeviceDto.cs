using AutoMapper;
using CentralStation.Domain.Networking.Entities;

namespace CentralStation.Application.Network.DataTransfer;

[AutoMap(typeof(NetworkDevice), ReverseMap = true)]
public class UpdateNetworkDeviceDto
{
    public int Id { get; set; }
    public string? DisplayName { get; set; }
    public int? Address { get; set; }
    public int NetworkId { get; set; }
}
