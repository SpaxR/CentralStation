namespace CentralStation;

public abstract class UnitTestBase
{

}
public abstract class UnitTestBase<TSUT> : UnitTestBase
	where TSUT : class
{
	private TSUT? _sut;

	protected TSUT SUT => _sut ??= CreateSUT();

	protected abstract TSUT CreateSUT();

	[Fact]
	public void Sanity_Check() => Assert.NotNull(SUT);
}
