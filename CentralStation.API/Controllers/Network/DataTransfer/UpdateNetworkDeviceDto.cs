using AutoMapper;
using CentralStation.Application.Networking.Entities;

namespace CentralStation.API.Controllers.Network.DataTransfer;

[AutoMap(typeof(NetworkDevice), ReverseMap = true)]
public class UpdateNetworkDeviceDto
{
    public int Id { get; set; }
    public string? DisplayName { get; set; }
    public int? Address { get; set; }
    public int NetworkId { get; set; }
}
