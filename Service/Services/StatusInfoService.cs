using Data.Interfaces;
using Service.Dtos;
using Service.Factories;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class StatusInfoService(IStatusInfoRepository statusInfoRepository) : IStatusInfoService
{
    private readonly IStatusInfoRepository _statusInfoRepository = statusInfoRepository;
    
    
    
    public async Task<bool> CreateAsync(StatusInfoDto? dto)
    {
        if (dto is null || await _statusInfoRepository.AlreadyExistsAsync(x => x.StatusName == dto.StatusName))
            return false;
        
        try
        {
            var entity = StatusInfoFactory.Create(dto);
            await _statusInfoRepository.CreateAsync(entity);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was error when creating StatusInfo: {e.Message}");
            return false;
        }
    }

    public async Task<IEnumerable<StatusInfo>> GetAllAsync()
    {
        var statuses = new List<StatusInfo>();
        
        try
        {
            var entities = await _statusInfoRepository.GetAllAsync();
            statuses.AddRange(entities.Select(entity => StatusInfoFactory.Create(entity)));
            return statuses;
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was error when getting all Statuses: {e.Message}");
            return [];
        }
    }

    public async Task<StatusInfo> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _statusInfoRepository.GetAsync(x => x.Id == id);
            return StatusInfoFactory.Create(entity);
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was error when getting Status: {e.Message}");
            return null!;
        }
    }

    public async Task<bool> UpdateAsync(StatusInfo? model)
    {
        if (model is null) return false;

        try
        {
            var entity = StatusInfoFactory.Create(model);
            await _statusInfoRepository.UpdateAsync( (x => x.Id == model.Id), entity);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"there was error when updating The Status: {e.Message}");
            return false;
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var result = await _statusInfoRepository.DeleteAsync(x => x.Id == id);
            return result;
        }
        catch (Exception e)
        {
            Console.WriteLine($"there was error when deleting Status: {e.Message}");
            return false;
        }
    }
}