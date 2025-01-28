using Data.Entities;

namespace Data.Interfaces;

public interface IEmployeeRepository : IBaseRepository<EmployeeEntity>
{
    public Task<IEnumerable<EmployeeEntity>> GetAllEmployeesIncludingRoleAsync();
}