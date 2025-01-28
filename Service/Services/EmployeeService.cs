using Service.Dtos;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class EmployeeService : IEmployeeService
{
    public Task<bool> CreateAsync(EmployeeDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Employee>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Employee> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAsync(EmployeeDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}