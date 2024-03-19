using AutoMapper;
using CentralStation.Domain.Networking.Entities;

namespace CentralStation.Application.Networking;

[AutoMap(typeof(Network), ReverseMap = true)]
public class CreateNetworkDto
{
    public string? DisplayName { get; set; }
    public int Address { get; set; }
    public int Subnet { get; set; }
}
