using Data.Interfaces;
using Service.Dtos;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class CustomerService(ICustomerRepository customerRepository) : ICustomerService
{
    ICustomerRepository _customerRepository = customerRepository;
    
    
    public Task<IResult> CreateAsync(CustomerDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<IResult<IEnumerable<Customer>>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<IResult<Customer>> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IResult> UpdateAsync(Customer model)
    {
        throw new NotImplementedException();
    }

    public Task<IResult> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}