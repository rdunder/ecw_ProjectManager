using Service.Dtos;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class ServiceInfoService : IServiceInfoService
{
    public Task<bool> CreateAsync(ServiceInfoDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<ServiceInfo>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<ServiceInfo> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAsync(ServiceInfoDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}