namespace CentralStation.Core;

public class PaginationOptions
{
    public int PageIndex { get; set; }
    public int PageSize { get; set; } = 10;

    // public string OrderBy { get; set; } = nameof(Entity.Id);
    // public bool IsDescending { get; set; }
}

public class PaginationResult<T>
{
    public IEnumerable<T> Data { get; set; } = Enumerable.Empty<T>();

    public int TotalCount { get; set; }
}
