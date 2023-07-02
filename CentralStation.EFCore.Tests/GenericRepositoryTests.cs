using CentralStation.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace CentralStation.EFCore;

public class GenericRepositoryTests : UnitTestBase<GenericRepository<GenericRepositoryTests.FakeEntity, Guid>>
{
	private readonly Mock<CentralStationDBContext> _context = new();

	/// <inheritdoc />
	protected override GenericRepository<FakeEntity, Guid> CreateSUT() => new(_context.Object);

	public class Get : GenericRepositoryTests
	{
		[Fact]
		public void With_existing_Entity_returns_Entity()
		{
			var id          = Guid.Parse("BB2BEE7E-0963-4C77-B303-27DAC31D655A");
			var expectation = new FakeEntity();
			_context.Setup(ctx => ctx.Find<FakeEntity>(id))
				.Returns(expectation);

			var result = SUT.Get(id);

			Assert.Equal(expectation, result);
		}

		[Fact]
		public void Without_existing_Entity_throws_Exception_with_Id()
		{
			var id = Guid.Empty;

			var result = Assert.Throws<KeyNotFoundException>(() => SUT.Get(id));

			Assert.Contains(id.ToString(), result.Message);
		}
	}
	public class GetAll : GenericRepositoryTests
	{
		[Fact]
		public void Returns_IQueryable_of_Entity()
		{
			_context.Setup(ctx => ctx.Set<FakeEntity>())
				.Returns(Mock.Of<DbSet<FakeEntity>>());

			var result = SUT.GetAll();

			Assert.IsAssignableFrom<IQueryable<FakeEntity>>(result);
		}
	}
	public class InsertOrUpdate : GenericRepositoryTests
	{
		[Fact]
		public void Adds_Entity_To_Context()
		{
			var expectation = new FakeEntity();

			SUT.InsertOrUpdate(expectation);

			_context.Verify(ctx => ctx.Add(expectation));
		}
	}
	public class Delete : GenericRepositoryTests
	{
		[Fact]
		public void WithId_fetches_and_sets_Entity_as_deleted()
		{
			var entity = new FakeEntity();
			_context
				.Setup(ctx => ctx.Find<FakeEntity>(It.IsAny<Guid>()))
				.Returns(entity);

			SUT.Delete(entity.Id);

			_context.Verify(ctx => ctx.Remove(entity));
		}

		[Fact]
		public void WithEntity_sets_entity_as_deleted()
		{
			var entity = new FakeEntity();

			SUT.Delete(entity);

			_context.Verify(ctx => ctx.Remove(entity));
		}

	}
	public class SaveChanges : GenericRepositoryTests
	{
		[Fact]
		public void Passes_SaveChanges_through_to_Context()
		{
			SUT.SaveChanges();

			_context.Verify(ctx => ctx.SaveChanges());
		}
	}



	public class FakeEntity : IEntity<Guid>
	{
		/// <inheritdoc />
		public Guid Id
		{
			get;
			set;
		}
	}
}
