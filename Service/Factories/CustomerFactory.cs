using Data.Entities;
using Service.Dtos;
using Service.Models;

namespace Service.Factories;

public static class CustomerFactory
{
    public static CustomerDto Create() => new CustomerDto();

    public static CustomerEntity Create(CustomerDto dto) =>
        dto is null
            ? throw new ArgumentNullException(nameof(dto))
            : new CustomerEntity()
            {
                CompanyName = dto.CompanyName,
                Email = dto.Email
            };

    public static Customer Create(CustomerEntity entity)
    {
        var contactPerson = new ContactPerson();
            
        if (entity.ContactPerson != null)
            contactPerson = ContactPersonFactory.Create(entity.ContactPerson);
            
        var customer = new Customer
        {
            Id = entity.Id,
            CompanyName = entity.CompanyName,
            Email = entity.Email,
            ContactPerson = contactPerson
        };
        
        return customer;
    }
            
}