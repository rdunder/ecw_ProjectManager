using System.Linq.Expressions;
using Data.Interfaces;
using Service.Dtos;
using Service.Factories;
using Service.Helpers;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class RoleService(IRoleRepository roleRepository) : IRoleService
{
    private readonly IRoleRepository _roleRepository = roleRepository;

    
    
    public async Task<IResult> CreateAsync(RoleDto? dto)
    {
        if (dto is null)
            return Result.BadRequest("RoleDto is null");
                
        if (await _roleRepository.AlreadyExistsAsync(x => x.RoleName == dto.RoleName))
            return Result.AlreadyExists("Role already exists");
        
        try
        {
            var entity = RoleFactory.Create(dto);
            await _roleRepository.CreateAsync(entity);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"There was an error when creating role :: {e.Message}");
        }
    }

    public async Task<IResult<IEnumerable<Role>>> GetAllAsync()
    {
        var roles = new List<Role>();
        
        try
        {
            var entities = await _roleRepository.GetAllAsync();
            roles.AddRange(entities.Select(entity => RoleFactory.Create(entity)));
            //return Result<IEnumerable<Role>>.Ok(roles);
            return Result<IEnumerable<Role>>.Ok(roles);
        }
        catch (Exception e)
        {
            return Result<IEnumerable<Role>>.ExceptionError($"There was error when getting all roles: {e.Message}");
        }
    }

    public async Task<IResult<Role>> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _roleRepository.GetAsync(x => x.Id == id);
            return Result<Role>.Ok(RoleFactory.Create(entity));
        }
        catch (Exception e)
        {
            return Result<Role>.ExceptionError($"There was error when getting role: {e.Message}");
        }
    }

    public async Task<IResult> UpdateAsync(int id, RoleDto? dto)
    {
        if (dto is null) 
            return Result.BadRequest("Role is null");

        try
        {
            var entity = RoleFactory.Create(dto);
            await _roleRepository.UpdateAsync( (x => x.Id == id), entity);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"There was an error when updating role: {e.Message}");
        }
    }

    public async Task<IResult> DeleteAsync(int id)
    {
        if (await _roleRepository.AlreadyExistsAsync(x => x.Id == id) == false)
            return Result.BadRequest("Role Id Does Not Exists");
            
        try
        {
            var result = await _roleRepository.DeleteAsync(x => x.Id == id);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"There was an error when deleting role: {e.Message}");
        }
    }
}