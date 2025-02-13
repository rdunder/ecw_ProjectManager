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
        List<ContactPerson> contactPersons = new();
            
        if (entity.ContactPersons != null)
            foreach (var contact in entity.ContactPersons)
            {
                contactPersons.Add(ContactPersonFactory.Create(contact));
            }
            
        var customer = new Customer
        {
            Id = entity.Id,
            CompanyName = entity.CompanyName,
            Email = entity.Email,
            ContactPersons = contactPersons
        };
        
        return customer;
    }
            
}