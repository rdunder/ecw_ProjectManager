using Data.Interfaces;
using Service.Dtos;
using Service.Factories;
using Service.Helpers;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class CustomerService(ICustomerRepository customerRepository) : ICustomerService
{
    ICustomerRepository _customerRepository = customerRepository;
    
    
    public async Task<IResult> CreateAsync(CustomerDto? dto)
    {
        if (dto is null)
            return Result.BadRequest("Customer Dto is null");

        if (await _customerRepository.AlreadyExistsAsync(x => x.Email == dto.Email))
            return Result.AlreadyExists($"Customer with email {dto.Email} already exists");

        await _customerRepository.BeginTransactionAsync();

        try
        {
            var entity = CustomerFactory.Create(dto);
            await _customerRepository.CreateAsync(entity);

            await _customerRepository.SaveChangesAsync();
            await _customerRepository.CommitTransactionAsync();
            
            return Result.Ok();
        }
        catch (Exception e)
        {
            await _customerRepository.RollbackTransactionAsync();
            return Result.ExceptionError($"An error occured creating Customer: {e.Message}");
        }
    }

    public async Task<IResult<IEnumerable<Customer>>> GetAllAsync()
    {
        var customers = new List<Customer>();
        
        try
        {
            var entities = await _customerRepository.GetAllAsync();
            customers.AddRange(entities.Select(entity => CustomerFactory.Create(entity)));
            return Result<IEnumerable<Customer>>.Ok(customers);
        }
        catch (Exception e)
        {
            return Result<IEnumerable<Customer>>.ExceptionError($"There was an error getting all Customers: {e.Message}");
        }
    }

    public async Task<IResult<IEnumerable<Customer>>> GetAllCustomersIncludingContactPersonAsync()
    {
        var customers = new List<Customer>();
        
        try
        {
            var entities = await _customerRepository.GetAllCustomersIncludingContactPersonAsync();
            customers.AddRange(entities.Select(entity => CustomerFactory.Create(entity)));
            return Result<IEnumerable<Customer>>.Ok(customers);
        }
        catch (Exception e)
        {
            return Result<IEnumerable<Customer>>.ExceptionError($"There was an error getting all Customers: {e.Message}");
        }   
    }

    public async Task<IResult<Customer>> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _customerRepository.GetAsync(x => x.Id == id);
            return Result<Customer>.Ok(CustomerFactory.Create(entity));
        }
        catch (Exception e)
        {
            return Result<Customer>.ExceptionError($"There was an error getting Customers: {e.Message}");
        }
    }

    public async Task<IResult> UpdateAsync(int id, CustomerDto? dto)
    {
        if (dto is null)
            return Result.BadRequest("Customer Dto is null");
                
        if (await _customerRepository.AlreadyExistsAsync(x => x.Id == id) == false)
            return Result.AlreadyExists($"Customer with id {id} does not exist");
        
        await _customerRepository.BeginTransactionAsync();

        try
        {
            var entity = CustomerFactory.Create(dto);
            entity.Id = id;
            
            _customerRepository.Update(entity);
            
            await _customerRepository.SaveChangesAsync();
            await _customerRepository.CommitTransactionAsync();
            
            return Result.Ok();
        }
        catch (Exception e)
        {
            await _customerRepository.RollbackTransactionAsync();
            return Result.ExceptionError($"There was an error updating Customer: {e.Message}");
        }
    }

    public async Task<IResult> DeleteAsync(int id)
    {
        if (await _customerRepository.AlreadyExistsAsync(x => x.Id == id) == false)
            return Result.BadRequest($"Customer with id {id} does not exist");
        
        await _customerRepository.BeginTransactionAsync();
        
        try
        {
            var entity = await _customerRepository.GetAsync(x => x.Id == id);
            _customerRepository.Delete(entity);
            
            await _customerRepository.SaveChangesAsync();
            await _customerRepository.CommitTransactionAsync();
            
            return Result.Ok();
        }
        catch (Exception e)
        {
            await _customerRepository.RollbackTransactionAsync();
            return Result.ExceptionError($"There was an error deleting Customer: {e.Message}");
        }
    }
}