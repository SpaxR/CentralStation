using AutoMapper;
using CentralStation.API.Controllers.Network.DataTransfer;
using CentralStation.Core;
using CentralStation.EFCore;
using Microsoft.AspNetCore.Mvc;

namespace CentralStation.API.Controllers.Network;

[ApiController, Route("/networks"), Tags("Networks")]
public class NetworkCrudController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly CentralStationDbContext _context;

    public NetworkCrudController(IMapper mapper, CentralStationDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<NetworkDto> GetNetworks([FromQuery] PaginationOptions options)
    {
        var networks = _context.Networks
            .OrderBy(network => network.Id)
            .Skip(options.PageIndex * options.PageSize)
            .Take(options.PageSize);

        return _mapper.Map<IEnumerable<NetworkDto>>(networks);
    }

    [HttpPost]
    public async Task<int> CreateNetwork(CreateNetworkDto network)
    {
        var entity = _mapper.Map<Application.Networking.Entities.Network>(network);
        await _context.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity.Id;
    }

    [HttpPatch]
    public async Task UpdateNetwork(UpdateNetworkDto network)
    {
        var entity = _mapper.Map<Application.Networking.Entities.Network>(network);
        _context.Update(entity);
        await _context.SaveChangesAsync();
    }

    [HttpDelete]
    public async Task DeleteNetwork(int id)
    {
        _context.Remove(new Application.Networking.Entities.Network { Id = id });
        await _context.SaveChangesAsync();
    }
}
