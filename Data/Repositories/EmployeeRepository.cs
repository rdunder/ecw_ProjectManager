using Data.Contexts;
using Data.Entities;
using Data.Interfaces;

namespace Data.Repositories;

public class EmployeeRepository(SqlDataContext context) :
    BaseRepository<EmployeeEntity>(context),
    IEmployeeRepository
{
    
}