using Microsoft.Extensions.DependencyInjection;
using Spectre.Console.Cli;

namespace Migrator.Infrastructure;

public class SpectreTypeRegistrar(IServiceCollection services) : ITypeRegistrar
{
    /// <inheritdoc />
    public void Register(Type service, Type implementation)
        => services.AddSingleton(service, implementation);

    /// <inheritdoc />
    public void RegisterInstance(Type service, object implementation)
        => services.AddSingleton(service, implementation);

    /// <inheritdoc />
    public void RegisterLazy(Type service, Func<object> factory)
        => services.AddSingleton(service, _ => factory());

    /// <inheritdoc />
    public ITypeResolver Build()
        => new SpectreTypeResolver(services.BuildServiceProvider());
}

public sealed class SpectreTypeResolver(IServiceProvider provider) : ITypeResolver, IDisposable
{
    /// <inheritdoc />
    public object? Resolve(Type? type)
        => type == null ? null : provider.GetService(type);

    /// <inheritdoc />
    public void Dispose()
        => (provider as IDisposable)?.Dispose();
}
