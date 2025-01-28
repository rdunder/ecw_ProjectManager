using Data.Interfaces;
using Service.Dtos;
using Service.Factories;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class ServiceInfoService(IServiceInfoRepository serviceInfoRepository) : IServiceInfoService
{
    private readonly IServiceInfoRepository _serviceInfoRepository = serviceInfoRepository;
    
    
    public async Task<bool> CreateAsync(ServiceInfoDto? dto)
    {
        if (dto is null || await _serviceInfoRepository.AlreadyExistsAsync(x => x.ServiceName == dto.ServiceName))
            return false;
        
        try
        {
            var entity = ServiceInfoFactory.Create(dto);
            await _serviceInfoRepository.CreateAsync(entity);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was error when creating Service: {e.Message}");
            return false;
        }
    }

    public async Task<IEnumerable<ServiceInfo>> GetAllAsync()
    {
        var services = new List<ServiceInfo>();
        
        try
        {
            var entities = await _serviceInfoRepository.GetAllAsync();
            services.AddRange(entities.Select(entity => ServiceInfoFactory.Create(entity)));
            return services;
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was error when getting all Services: {e.Message}");
            return [];
        }
    }

    public async Task<ServiceInfo> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _serviceInfoRepository.GetAsync(x => x.Id == id);
            return ServiceInfoFactory.Create(entity);
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was error when getting Service: {e.Message}");
            return null!;
        }
    }

    public async Task<bool> UpdateAsync(ServiceInfo? model)
    {
        if (model is null) return false;

        try
        {
            var entity = ServiceInfoFactory.Create(model);
            await _serviceInfoRepository.UpdateAsync( (x => x.Id == model.Id), entity);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"there was error when updating The Service: {e.Message}");
            return false;
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var result = await _serviceInfoRepository.DeleteAsync(x => x.Id == id);
            return result;
        }
        catch (Exception e)
        {
            Console.WriteLine($"there was error when deleting service: {e.Message}");
            return false;
        }
    }
}