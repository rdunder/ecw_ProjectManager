using System.Linq.Expressions;
using Data.Interfaces;
using Service.Dtos;
using Service.Factories;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class RoleService(IRoleRepository roleRepository) : IRoleService
{
    private readonly IRoleRepository _roleRepository = roleRepository;
    
    
    
    public async Task<bool> CreateAsync(RoleDto? dto)
    {
        if (dto is null || await _roleRepository.AlreadyExistsAsync(x => x.RoleName == dto.RoleName))
            return false;
        
        try
        {
            var entity = RoleFactory.Create(dto);
            await _roleRepository.CreateAsync(entity);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was error when creating role: {e.Message}");
            return false;
        }
    }

    public async Task<IEnumerable<Role>> GetAllAsync()
    {
        var roles = new List<Role>();
        
        try
        {
            var entities = await _roleRepository.GetAllAsync();
            roles.AddRange(entities.Select(entity => RoleFactory.Create(entity)));
            return roles;
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was error when getting all roles: {e.Message}");
            return [];
        }
    }

    public async Task<Role> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _roleRepository.GetAsync(x => x.Id == id);
            return RoleFactory.Create(entity);
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was error when getting role: {e.Message}");
            return null!;
        }
    }

    public async Task<bool> UpdateAsync(Role? role)
    {
        if (role is null) return false;

        try
        {
            var entity = RoleFactory.Create(role);
            await _roleRepository.UpdateAsync( (x => x.Id == role.Id), entity);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"there was error when updating role: {e.Message}");
            return false;
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        try
        {
            var result = await _roleRepository.DeleteAsync(x => x.Id == id);
            return result;
        }
        catch (Exception e)
        {
            Console.WriteLine($"there was error when deleting role: {e.Message}");
            return false;
        }
    }
}