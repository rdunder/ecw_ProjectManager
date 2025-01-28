using Service.Dtos;
using Service.Models;

namespace Service.Interfaces;

public interface IEmployeeService : IService<Employee, EmployeeDto>
{
    
}