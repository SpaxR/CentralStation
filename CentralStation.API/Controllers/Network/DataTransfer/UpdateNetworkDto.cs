using AutoMapper;

namespace CentralStation.API.Controllers.Network.DataTransfer;

[AutoMap(typeof(Application.Networking.Entities.Network), ReverseMap = true)]
public class UpdateNetworkDto
{
    public int Id { get; set; }
    public string? DisplayName { get; set; }
    public int Address { get; set; }
    public int Subnet { get; set; }
}
