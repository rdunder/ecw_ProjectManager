using Api.Main.Interfaces;

namespace Api.Main.Services;

public static class ApiKeyServiceExtensions
{
    public static IServiceCollection AddApiKeyAuthentication(
        this IServiceCollection services)
    {
        services.AddMemoryCache();
        services.AddScoped<IApiKeyValidator, ApiKeyValidator>();
        
        return services;
    }
}