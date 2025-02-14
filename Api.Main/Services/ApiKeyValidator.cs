using Api.Main.Interfaces;
using Api.Main.Models;
using Microsoft.Extensions.Caching.Memory;

namespace Api.Main.Services;

public class ApiKeyValidator : IApiKeyValidator
{
    private readonly IConfiguration _configuration;
    private readonly IMemoryCache _cache;
    private const string CacheKey = "ApiKey_Valid";

    public ApiKeyValidator(IConfiguration configuration, IMemoryCache cache)
    {
        _configuration = configuration;
        _cache = cache;
    }

    public bool IsValidApiKey(string apiKey)
    {
        if (_cache.TryGetValue(CacheKey, out string validKey))
        {
            return apiKey == validKey;
        }

        var settings = _configuration.GetSection("ProjectManagerApiKey").Get<ApiKeySettings>();
        
        if (settings == null || !settings.IsActive)
            return false;

        // Cache the valid key for 5 minutes
        _cache.Set(CacheKey, settings.Key, TimeSpan.FromMinutes(5));

        return apiKey == settings.Key;
    }
    
}