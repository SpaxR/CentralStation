using CentralStation.Infrastructure;
using Moq;

namespace CentralStation.Networking;

public class ReachabilityManagerTests : UnitTestBase<ReachabilityManager>
{
	private readonly Mock<IRepository<NetworkDevice, Guid>> _devices = new();

	private readonly NetworkDevice _reachableDevice =
		new(Guid.Parse("6F661357-DB9A-4686-A879-6D878EB4475D"), "127.0.0.1");

	private readonly NetworkDevice _unreachableDevice =
		new(Guid.Parse("85B9AE5E-9650-4A78-8626-48A3FDA2103C"), "1.2.3.4");

	/// <inheritdoc />
	protected override ReachabilityManager CreateSUT() => new(_devices.Object);


	public class PingDeviceTests : ReachabilityManagerTests
	{
		[Fact]
		public async Task Pingable_Device_returns_true()
		{
			var result = await SUT.PingDevice(_reachableDevice);

			Assert.True(result, "Reachable Device not responding");
		}

		[Fact]
		public async Task Not_Pingable_Device_returns_false()
		{
			var result = await SUT.PingDevice(_unreachableDevice);

			Assert.False(result, "Unreachable Device did respond");
		}
	}

	public class PingDevicesTests : ReachabilityManagerTests
	{

		[Fact]
		public async Task Without_ids_returns_empty_List()
		{
			var result = await SUT.PingDevices().ToListAsync();

			Assert.Empty(result);
		}

		[Fact]
		public async Task Returns_ids_with_corresponding_PingResult()
		{
			var expectations = new[]
			{
				(_reachableDevice.Id, true),
				(_unreachableDevice.Id, false),
			};
			_devices.Setup(repository => repository.GetAll())
				.Returns(new[] { _reachableDevice, _unreachableDevice }.AsQueryable);


			var result = await SUT.PingDevices(_reachableDevice.Id, _unreachableDevice.Id).ToListAsync();

			Assert.Equivalent(expectations, result, true);
		}
	}
}
