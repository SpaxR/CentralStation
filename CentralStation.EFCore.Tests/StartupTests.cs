using CentralStation.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Moq;
using Moq.Contrib.ExpressionBuilders.Logging;
using static Moq.It;

namespace CentralStation.EFCore;

public class StartupTests : UnitTestBase
{
	private readonly ServiceCollection _services = new();
	private readonly Mock<IConfiguration> _configuration = new();

	private IServiceProvider ServiceProvider => _services.BuildServiceProvider();

	private const string ValidConnectionString = "Server=localhost;User Id=sa;Password=yaq1YAQ!;TrustServerCertificate=True;";

	protected StartupTests()
	{
		_configuration
			.Setup(c => c.GetSection(IsAny<string>()))
			.Returns(Mock.Of<IConfigurationSection>());
	}

	private void SetupConnectionString()
	{
		_configuration
			.Setup(c => c.GetSection("ConnectionStrings"))
			.Returns(Mock.Of<IConfigurationSection>(section => section[InfrastructureStartupExtensions.ConnectionStringIdentifier] == ValidConnectionString));
	}

	public class AddInfrastructure : StartupTests
	{

		[Fact]
		public void Registers_generic_Repository_as_IRepository()
		{
			_services.AddInfrastructure(_configuration.Object);

			var repository = ServiceProvider.GetRequiredService<IRepository<FakeEntity, int>>();
			Assert.IsType<GenericRepository<FakeEntity, int>>(repository);
		}

		[Fact]
		public void Registers_DbContext()
		{
			_services.AddInfrastructure(_configuration.Object);

			using var scope   = ServiceProvider.CreateScope();
			using var context = scope.ServiceProvider.GetService<CentralStationDBContext>();
			Assert.NotNull(context);
		}

		[Fact]
		public void Without_ConnectionString_Uses_InMemory_Database()
		{
			_services.AddInfrastructure(_configuration.Object);

			using var scope   = ServiceProvider.CreateScope();
			using var context = scope.ServiceProvider.GetRequiredService<CentralStationDBContext>();
			Assert.Contains(nameof(Microsoft.EntityFrameworkCore.InMemory), context.Database.ProviderName);
		}

		[Fact]
		public void With_ConnectionString_Uses_SQL_Server()
		{
			SetupConnectionString();

			_services.AddInfrastructure(_configuration.Object);

			using var scope   = ServiceProvider.CreateScope();
			using var context = scope.ServiceProvider.GetRequiredService<CentralStationDBContext>();
			Assert.Contains(nameof(Microsoft.EntityFrameworkCore.SqlServer), context.Database.ProviderName);
		}

		private class FakeEntity : IEntity
		{
			/// <inheritdoc />
			public int Id
			{
				get;
				set;
			}
		}
	}

	public class InitializeInfrastructure : StartupTests
	{
		private readonly Mock<ILogger> _logger = new();

		public InitializeInfrastructure()
		{
			var loggerFactory = new Mock<ILoggerFactory>();
			loggerFactory
				.Setup(lf => lf.CreateLogger(IsAny<string>()))
				.Returns(_logger.Object);

			_services.AddSingleton(loggerFactory.Object);

			_services.AddDbContext<CentralStationDBContext>(options => options.UseInMemoryDatabase("TEST-DB"));
		}

		[Fact]
		public void Logs_type_of_DatabaseProvider()
		{
			ServiceProvider.InitializeInfrastructure();

			_logger.Verify(
				Log.With.LogLevel(LogLevel.Information)
					.And.LogMessage(m => m.Contains("database", StringComparison.OrdinalIgnoreCase))
					.And.LoggedValue(k => k.Value.ToString()!.Contains(nameof(Microsoft.EntityFrameworkCore.InMemory))
					), Times.Once
			);

		}

	}


}
