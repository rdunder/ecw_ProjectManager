namespace Api.Main.Interfaces;

public interface IApiKeyValidator
{
    bool IsValidApiKey(string apiKey);
}