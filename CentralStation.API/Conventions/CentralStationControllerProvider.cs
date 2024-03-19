using CentralStation.Application;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace CentralStation.API.Conventions;

public class CentralStationControllerProvider : IApplicationFeatureProvider<ControllerFeature>
{
    /// <inheritdoc />
    public void PopulateFeature(IEnumerable<ApplicationPart> parts, ControllerFeature feature)
    {
        foreach (var part in parts)
        {
            if (part is not AssemblyPart assembly) continue;

            var serviceTypes = assembly.Types
                .Where(type => type.IsAssignableTo(typeof(IApplicationService)))
                .Where(type => type is { IsClass: true, IsAbstract: false });

            foreach (var serviceType in serviceTypes)
            {
                feature.Controllers.Add(serviceType);
            }
        }
    }
}