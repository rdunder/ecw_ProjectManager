using Service.Dtos;
using Service.Helpers;
using Service.Models;

namespace Service.Interfaces;

public interface IEmployeeService : IService<Employee, EmployeeDto>
{
    public Task<IResult< IEnumerable<Employee> >> GetEmployeesIncludingRoleAsync();
}