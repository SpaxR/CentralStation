using AutoMapper;
using CentralStation.API.Controllers.Network.DataTransfer;
using CentralStation.Application.Networking.Entities;
using CentralStation.Core;
using CentralStation.EFCore;
using Microsoft.AspNetCore.Mvc;

namespace CentralStation.API.Controllers.Network;

[ApiController, Route("/network-device"), Tags("NetworkDevices")]
public class NetworkDeviceCrudController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly CentralStationDbContext _context;

    public NetworkDeviceCrudController(IMapper mapper, CentralStationDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<NetworkDeviceDto> GetNetworkDevices([FromQuery] PaginationOptions options)
    {
        var networks = _context.NetworkDevices
            .OrderBy(network => network.Id)
            .Skip(options.PageIndex * options.PageSize)
            .Take(options.PageSize);

        return _mapper.Map<IEnumerable<NetworkDeviceDto>>(networks);
    }

    [HttpPost]
    public async Task<int> CreateNetworkDevice(CreateNetworkDeviceDto network)
    {
        var entity = _mapper.Map<NetworkDevice>(network);
        await _context.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }

    [HttpPatch]
    public async Task UpdateNetworkDevice(UpdateNetworkDeviceDto network)
    {
        var entity = _mapper.Map<NetworkDevice>(network);
        _context.Update(entity);
        await _context.SaveChangesAsync();
    }

    [HttpDelete]
    public async Task DeleteNetworkDevice(int id)
    {
        _context.Remove(new NetworkDevice(default) { Id = id });
        await _context.SaveChangesAsync();
    }
}
