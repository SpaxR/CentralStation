using AutoMapper;
using CentralStation.Core;
using CentralStation.Domain.Networking.Entities;

namespace CentralStation.Application.Networking;

public class NetworkDeviceAppService : IApplicationService
{
    private readonly IMapper _mapper;
    private readonly IRepository<NetworkDevice> _deviceRepository;

    public NetworkDeviceAppService(IMapper mapper, IRepository<NetworkDevice> deviceRepository)
    {
        _mapper = mapper;
        _deviceRepository = deviceRepository;
    }

    public IEnumerable<NetworkDeviceDto> GetNetworkDevices(PaginationOptions options)
    {
        var networks = _deviceRepository
            .GetAll()
            .OrderBy(network => network.Id)
            .Skip(options.PageIndex * options.PageSize)
            .Take(options.PageSize);

        return _mapper.Map<IEnumerable<NetworkDeviceDto>>(networks);
    }

    public async Task<int> CreateNetworkDevice(CreateNetworkDeviceDto network)
    {
        var entity = _mapper.Map<NetworkDevice>(network);
        await _deviceRepository.InsertAsync(entity);
        return entity.Id;
    }

    public void UpdateNetworkDevice(UpdateNetworkDeviceDto network)
    {
        var entity = _mapper.Map<NetworkDevice>(network);
        _deviceRepository.Update(entity);
    }

    public void DeleteNetworkDevice(int id)
    {
        _deviceRepository.Delete(new NetworkDevice(default) { Id = id });
    }
}
