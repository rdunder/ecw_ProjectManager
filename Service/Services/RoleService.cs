using Service.Dtos;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class RoleService : IRoleService
{
    public Task<bool> CreateAsync(RoleDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Role>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Role> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAsync(RoleDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}