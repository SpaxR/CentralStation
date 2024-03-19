using AutoMapper;
using CentralStation.Core;
using CentralStation.Domain.Networking.Entities;

namespace CentralStation.Application.Networking;

public class NetworkAppService : IApplicationService
{
    private readonly IMapper _mapper;
    private readonly IRepository<Network> _networkRepository;

    public NetworkAppService(IMapper mapper, IRepository<Network> networkRepository)
    {
        _mapper = mapper;
        _networkRepository = networkRepository;
    }

    public IEnumerable<NetworkDto> GetAll(PaginationOptions options)
    {
        var networks = _networkRepository
            .GetAll()
            .OrderBy(network => network.Id)
            .Skip(options.PageIndex * options.PageSize)
            .Take(options.PageSize);

        return _mapper.Map<IEnumerable<NetworkDto>>(networks);
    }

    public NetworkDto Get(int id)
    {
        var network = _networkRepository.Get(id);
        return _mapper.Map<NetworkDto>(network);
    }

    public async Task<int> CreateNetwork(CreateNetworkDto network)
    {
        var entity = _mapper.Map<Network>(network);
        await _networkRepository.InsertAsync(entity);
        return entity.Id;
    }

    public void UpdateNetwork(UpdateNetworkDto network)
    {
        var entity = _mapper.Map<Network>(network);
        _networkRepository.Update(entity);
    }

    public void DeleteNetwork(int id)
    {
        _networkRepository.Delete(new Network { Id = id });
    }
}
