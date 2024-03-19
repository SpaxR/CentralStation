using System.ComponentModel.DataAnnotations.Schema;
using CentralStation.Core;

namespace CentralStation.Domain.Networking.Entities;

[Table("devices", Schema = "network")]
public class NetworkDevice : Entity
{
    public int NetworkId { get; init; }
    public Network? Network { get; init; }

    public int Address { get; init; }

    public string? DisplayName { get; set; }

    private NetworkDevice()
    {
        Network = null!;
    }

    public NetworkDevice(int networkId)
    {
        NetworkId = networkId;
    }

}
