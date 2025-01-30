using Service.Dtos;
using Service.Models;

namespace Service.Interfaces;

public interface ICustomerService : IService<Customer, CustomerDto>
{
    public Task<IResult<IEnumerable<Customer>>> GetAllCustomersIncludingContactPersonAsync();
}