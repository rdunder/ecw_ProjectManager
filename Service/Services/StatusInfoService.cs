using Data.Interfaces;
using Service.Dtos;
using Service.Factories;
using Service.Helpers;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class StatusInfoService(IStatusInfoRepository statusInfoRepository) : IStatusInfoService
{
    private readonly IStatusInfoRepository _statusInfoRepository = statusInfoRepository;
    
    
    
    public async Task<IResult> CreateAsync(StatusInfoDto? dto)
    {
        if (dto is null)
            return Result.BadRequest("StatusInfoDto is null");
                
        if (await _statusInfoRepository.AlreadyExistsAsync(x => x.StatusName == dto.StatusName))
            return Result.AlreadyExists("The status name already exists");
        
        
        try
        {
            var entity = StatusInfoFactory.Create(dto);
            await _statusInfoRepository.CreateAsync(entity);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"There was error when creating StatusInfo: {e.Message}");
        }
    }

    public async Task<IResult<IEnumerable<StatusInfo>>> GetAllAsync()
    {
        var statuses = new List<StatusInfo>();
        
        try
        {
            var entities = await _statusInfoRepository.GetAllAsync();
            statuses.AddRange(entities.Select(entity => StatusInfoFactory.Create(entity)));
            return Result<IEnumerable<StatusInfo>>.Ok(statuses);
        }
        catch (Exception e)
        {
            return Result<IEnumerable<StatusInfo>>.ExceptionError($"There was error when getting all Statuses: {e.Message}");
        }
    }

    public async Task<IResult<StatusInfo>> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _statusInfoRepository.GetAsync(x => x.Id == id);
            //return Result<StatusInfo>.Ok(StatusInfoFactory.Create(entity));
            return Result<StatusInfo>.Ok(StatusInfoFactory.Create(entity));
        }
        catch (Exception e)
        {
            return Result<StatusInfo>.ExceptionError($"There was error when getting Status: {e.Message}");
        }
    }

    public async Task<IResult> UpdateAsync(int id, StatusInfoDto? dto)
    {
        if (dto is null) 
            return Result.BadRequest("StatusInfo is null");
        
        if (await _statusInfoRepository.AlreadyExistsAsync(x => x.Id == id) == false)
            return Result.NotFound($"The status info record with ID: <{id}> could not be found");

        try
        {
            var entity = StatusInfoFactory.Create(dto);
            entity.Id = id;
            
            await _statusInfoRepository.UpdateAsync( (x => x.Id == id), entity);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"There was error when updating the Status: {e.Message}");
        }
    }

    public async Task<IResult> DeleteAsync(int id)
    {
        if (await _statusInfoRepository.AlreadyExistsAsync(x => x.Id == id) == false)
            return Result.BadRequest("Role Id Does Not Exists");
        
        try
        {
            var result = await _statusInfoRepository.DeleteAsync(x => x.Id == id);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"There was error when deleting Status: {e.Message}");
        }
    }
}