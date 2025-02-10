using Data.Interfaces;
using Service.Dtos;
using Service.Factories;
using Service.Helpers;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class ServiceInfoService(IServiceInfoRepository serviceInfoRepository) : IServiceInfoService
{
    private readonly IServiceInfoRepository _serviceInfoRepository = serviceInfoRepository;
    
    
    public async Task<IResult> CreateAsync(ServiceInfoDto? dto)
    {
        if (dto is null)
            Result.BadRequest("Service Dto is null");
                
        if (await _serviceInfoRepository.AlreadyExistsAsync(x => x.ServiceName == dto.ServiceName))
            return Result.AlreadyExists("Service name already exists");

        await _serviceInfoRepository.BeginTransactionAsync();
        
        try
        {
            var entity = ServiceInfoFactory.Create(dto);
            await _serviceInfoRepository.CreateAsync(entity);

            await _serviceInfoRepository.SaveChangesAsync();
            await _serviceInfoRepository.CommitTransactionAsync();
            
            return Result.Ok();
        }
        catch (Exception e)
        {
            await _serviceInfoRepository.RollbackTransactionAsync();
            return Result.ExceptionError($"There was an error when creating Service: {e.Message}");
        }
    }

    public async Task<IResult<IEnumerable<ServiceInfo>>> GetAllAsync()
    {
        var services = new List<ServiceInfo>();
        
        try
        {
            var entities = await _serviceInfoRepository.GetAllAsync();
            services.AddRange(entities.Select(entity => ServiceInfoFactory.Create(entity)));
            return Result<IEnumerable<ServiceInfo>>.Ok(services);
        }
        catch (Exception e)
        {
            return Result<IEnumerable<ServiceInfo>>.ExceptionError($"There was an error when getting all Services: {e.Message}");
        }
    }

    public async Task<IResult<ServiceInfo>> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _serviceInfoRepository.GetAsync(x => x.Id == id);
            return Result<ServiceInfo>.Ok(ServiceInfoFactory.Create(entity));
        }
        catch (Exception e)
        {
            return Result<ServiceInfo>.ExceptionError($"There was an error when getting Service: {e.Message}");
        }
    }

    public async Task<IResult> UpdateAsync(int id, ServiceInfoDto? dto)
    {
        if (dto is null) 
            return Result.BadRequest("Service Model is null");
        
        await _serviceInfoRepository.BeginTransactionAsync();

        try
        {
            var entity = ServiceInfoFactory.Create(dto);
            entity.Id = id;
            
            _serviceInfoRepository.Update(entity);
            
            await _serviceInfoRepository.SaveChangesAsync();
            await _serviceInfoRepository.CommitTransactionAsync();
            
            return Result.Ok();
        }
        catch (Exception e)
        {
            await _serviceInfoRepository.RollbackTransactionAsync();
            return Result.ExceptionError($"There was an error when updating the Service: {e.Message}");
        }
    }

    public async Task<IResult> DeleteAsync(int id)
    {
        if (await _serviceInfoRepository.AlreadyExistsAsync(x => x.Id == id) == false)
            return Result.BadRequest("Service Id Does Not Exists");
        
        await _serviceInfoRepository.BeginTransactionAsync();
        
        try
        {
            var entity = await _serviceInfoRepository.GetAsync(x => x.Id == id);
            _serviceInfoRepository.Delete(entity);
            
            await _serviceInfoRepository.SaveChangesAsync();
            await _serviceInfoRepository.CommitTransactionAsync();
            
            return Result.Ok();
        }
        catch (Exception e)
        {
            await _serviceInfoRepository.RollbackTransactionAsync();
            return Result.ExceptionError($"There was an error when deleting service: {e.Message}");
        }
    }
}