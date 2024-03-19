using AutoMapper;
using CentralStation.Domain.Networking.Entities;

namespace CentralStation.Application.Network.DataTransfer;

[AutoMap(typeof(NetworkEntity), ReverseMap = true)]
public class UpdateNetworkDto
{
    public int Id { get; set; }
    public string? DisplayName { get; set; }
    public int Address { get; set; }
    public int Subnet { get; set; }
}
