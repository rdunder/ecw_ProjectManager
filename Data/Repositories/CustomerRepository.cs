using Data.Contexts;
using Data.Entities;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class CustomerRepository(SqlDataContext context) :
    BaseRepository<CustomerEntity>(context),
    ICustomerRepository
{
    public async Task<IEnumerable<CustomerEntity>> GetAllCustomersIncludingContactPersonAsync()
    {
        try
        {
            var entities = await _context.Customers
                .Include(x => x.ContactPersons)
                .ToListAsync();
            return entities;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null!;
        }
    }
}