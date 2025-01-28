using Data.Interfaces;
using Service.Dtos;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class CustomerService(ICustomerRepository customerRepository) : ICustomerService
{
    ICustomerRepository _customerRepository = customerRepository;
    
    
    public Task<bool> CreateAsync(CustomerDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Customer>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Customer> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAsync(CustomerDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}