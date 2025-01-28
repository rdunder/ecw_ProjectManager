using Data.Contexts;
using Data.Entities;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class CustomerRepository(SqlDataContext context) :
    BaseRepository<CustomerEntity>(context),
    ICustomerRepository
{
    private readonly SqlDataContext _context = context;

    public async Task<IEnumerable<CustomerEntity>> GetAllCustomersIncludingContactPersonAsync()
    {
        try
        {
            var entities = await _context.Customers.Include(x => x.ContactPerson).ToListAsync();
            return entities;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null!;
        }
    }
}