using Data.Contexts;
using Data.Entities;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class EmployeeRepository(SqlDataContext context) :
    BaseRepository<EmployeeEntity>(context),
    IEmployeeRepository
{
    private readonly SqlDataContext _context = context;
    public async Task<IEnumerable<EmployeeEntity>> GetAllEmployeesIncludingRoleAsync()
    {
        try
        {
            var entities = await _context.Employees.Include(x => x.Role).ToListAsync();
            return entities;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null!;
        }
    }

    public async Task<EmployeeEntity> GetEmployeeByIdIncludingRoleAsync(int id)
    {
        try
        {
            var entity = await _context.Employees
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.EmploymentNumber == id);
            return entity ?? null!;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null!;
        }
    }
}