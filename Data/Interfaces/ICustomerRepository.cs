using Data.Entities;

namespace Data.Interfaces;

public interface ICustomerRepository : IBaseRepository<CustomerEntity>
{
    public Task<IEnumerable<CustomerEntity>> GetAllCustomersIncludingContactPersonAsync();
}