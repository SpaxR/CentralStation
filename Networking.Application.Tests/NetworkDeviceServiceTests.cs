using System.Net;
using CentralStation.Infrastructure;
using CentralStation.Networking.Models;
using Moq;

namespace CentralStation.Networking;

public class NetworkDeviceServiceTests : UnitTestBase<NetworkDeviceService>
{
	private readonly Mock<IReachabilityManager> _manager = new();
	private readonly Mock<IRepository<NetworkDevice, Guid>> _repository = new();

	/// <inheritdoc />
	protected override NetworkDeviceService CreateSUT() => new(_manager.Object, _repository.Object);

	public class GetAll : NetworkDeviceServiceTests
	{
		[Fact]
		public void Returns_all_devices_from_DbContext()
		{
			var devices = new[] { CreateNetworkDevice() };
			_repository.Setup(repo => repo.GetAll())
				.Returns(devices.AsQueryable());
			var expectation = devices.Select(device => new NetworkDeviceModel()
			{
				Id      = device.Id,
				Address = device.Address,
			});

			var result = SUT.GetAll();

			Assert.Equivalent(expectation, result);
		}

	}

	public class PingDeviceAsync : NetworkDeviceServiceTests
	{
		private NetworkDevice SetupNetworkDevice(Guid id)
		{
			var device = CreateNetworkDevice(id);

			_repository.Setup(repo => repo.Get(id))
				.Returns(device);

			return device;
		}

		[Theory]
		[InlineData(true)]
		[InlineData(false)]
		public async Task Returns_PingResult(bool pingSucceeded)
		{
			var device = SetupNetworkDevice(Guid.Parse("B472FE9A-845F-401E-876A-3E5146140CEC"));
			_manager.Setup(m => m.PingDevice(device))
				.ReturnsAsync(pingSucceeded);

			var result = await SUT.PingDeviceAsync(device.Id);

			Assert.Equal(pingSucceeded, result);
		}


	}


		private static NetworkDevice CreateNetworkDevice(Guid? id = null)
		{
			return new NetworkDevice(id ?? Guid.Empty, "127.0.0.1");
		}
}
