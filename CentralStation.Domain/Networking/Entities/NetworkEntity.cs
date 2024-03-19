using System.ComponentModel.DataAnnotations.Schema;
using CentralStation.Core;

namespace CentralStation.Domain.Networking.Entities;

[Table("networks", Schema = "network")]
public class NetworkEntity : Entity
{
    public string? DisplayName { get; set; }

    public int Address { get; set; }
    public int Subnet { get; set; }
}
