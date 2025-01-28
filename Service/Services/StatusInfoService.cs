using Service.Dtos;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class StatusInfoService : IStatusInfoService
{
    public Task<bool> CreateAsync(StatusInfoDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<StatusInfo>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<StatusInfo> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAsync(StatusInfoDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}