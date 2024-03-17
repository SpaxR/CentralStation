using AutoMapper;

namespace CentralStation.API.Controllers.Network.DataTransfer;

[AutoMap(typeof(Application.Networking.Entities.Network))]
public class NetworkDto
{
    public int Id { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public int Address { get; set; }
    public int Subnet { get; set; }
}
