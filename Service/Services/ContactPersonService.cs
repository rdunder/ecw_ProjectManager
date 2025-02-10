using Data.Interfaces;
using Service.Dtos;
using Service.Factories;
using Service.Helpers;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class ContactPersonService(
    IContactPersonRepository contactPersonRepository, 
    ICustomerRepository customerRepository) : IContactPersonService
{
    private readonly IContactPersonRepository _contactPersonRepository = contactPersonRepository;
    private readonly ICustomerRepository _customerRepository = customerRepository;
    
    
    
    public async Task<IResult> CreateAsync(ContactPersonDto? dto)
    {
        if (dto is null)
            return Result.BadRequest("EmployeeDto is null");

        if (await _customerRepository.AlreadyExistsAsync(x => x.Id == dto.CustomerId) == false)
            return Result.BadRequest($"Customer with id {dto.CustomerId} does not exist");

        if (await _contactPersonRepository.AlreadyExistsAsync(x => x.Email == dto.Email))
            return Result.AlreadyExists($"Contact Person with email {dto.Email} already exists");

        await _contactPersonRepository.BeginTransactionAsync();

        try
        {
            var entity = ContactPersonFactory.Create(dto);
            await _contactPersonRepository.CreateAsync(entity);

            await _contactPersonRepository.SaveChangesAsync();
            await _contactPersonRepository.CommitTransactionAsync();
            
            return Result.Ok();
        }
        catch (Exception e)
        {
            await _contactPersonRepository.RollbackTransactionAsync();
            return Result.ExceptionError($"An error occured creating Contact Person: {e.Message}");
        }
    }

    public async Task<IResult<IEnumerable<ContactPerson>>> GetAllAsync()
    {
        var contactPersons = new List<ContactPerson>();
        
        try
        {
            var entities = await _contactPersonRepository.GetAllAsync();
            contactPersons.AddRange(entities.Select(entity => ContactPersonFactory.Create(entity)));
            return Result<IEnumerable<ContactPerson>>.Ok(contactPersons);
        }
        catch (Exception e)
        {
            return Result<IEnumerable<ContactPerson>>.ExceptionError($"There was an error getting all Contact Persons: {e.Message}");
        }
    }

    public async Task<IResult<ContactPerson>> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _contactPersonRepository.GetAsync(x => x.Id == id);
            return Result<ContactPerson>.Ok(ContactPersonFactory.Create(entity));
        }
        catch (Exception e)
        {
            return Result<ContactPerson>.ExceptionError($"There was an error getting Contact Person: {e.Message}");
        }
    }

    public async Task<IResult> UpdateAsync(int id, ContactPersonDto? dto)
    {
        if (dto is null)
            return Result.BadRequest("EmployeeDto is null");
                
        if (await _contactPersonRepository.AlreadyExistsAsync(x => x.Id == id) == false)
            return Result.AlreadyExists($"ContactPerson with id {id} does not exist");
        
        await _contactPersonRepository.BeginTransactionAsync();

        try
        {
            var entity = ContactPersonFactory.Create(dto);
            entity.Id = id;
            
            _contactPersonRepository.Update(entity);
            
            await _contactPersonRepository.SaveChangesAsync();
            await _contactPersonRepository.CommitTransactionAsync();
            
            return Result.Ok();
        }
        catch (Exception e)
        {
            await _contactPersonRepository.RollbackTransactionAsync();
            return Result.ExceptionError($"There was an error updating ContactPerson: {e.Message}");
        }
    }

    public async Task<IResult> DeleteAsync(int id)
    {
        if (await _contactPersonRepository.AlreadyExistsAsync(x => x.Id == id) == false)
            return Result.BadRequest($"Employee with id {id} does not exist");
        
        await _contactPersonRepository.BeginTransactionAsync();
        
        try
        {
            var entity = await _contactPersonRepository.GetAsync(x => x.Id == id);
            _contactPersonRepository.Delete(entity);
            
            await _contactPersonRepository.SaveChangesAsync();
            await _contactPersonRepository.CommitTransactionAsync();
            
            return Result.Ok();
        }
        catch (Exception e)
        {
            await _contactPersonRepository.RollbackTransactionAsync();
            return Result.ExceptionError($"There was an error deleting Contact Person: {e.Message}");
        }
    }
}