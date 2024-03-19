using AutoMapper;
using CentralStation.Application.Network.DataTransfer;
using CentralStation.Core;
using CentralStation.Domain.Networking.Entities;

namespace CentralStation.Application.Network;

public class NetworkAppService : IApplicationService
{
    private readonly IMapper _mapper;
    private readonly IRepository<NetworkEntity> _networkRepository;

    public NetworkAppService(IMapper mapper, IRepository<NetworkEntity> networkRepository)
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
        var entity = _mapper.Map<NetworkEntity>(network);
        await _networkRepository.InsertAsync(entity);
        return entity.Id;
    }

    public void UpdateNetwork(UpdateNetworkDto network)
    {
        var entity = _mapper.Map<NetworkEntity>(network);
        _networkRepository.Update(entity);
    }

    public void DeleteNetwork(int id)
    {
        _networkRepository.Delete(new NetworkEntity { Id = id });
    }
}
