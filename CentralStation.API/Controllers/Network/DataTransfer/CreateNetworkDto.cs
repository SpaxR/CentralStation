using AutoMapper;

namespace CentralStation.API.Controllers.Network.DataTransfer;

[AutoMap(typeof(Application.Networking.Entities.Network), ReverseMap = true)]
public class CreateNetworkDto
{
    public string? DisplayName { get; set; }
    public int Address { get; set; }
    public int Subnet { get; set; }
}
