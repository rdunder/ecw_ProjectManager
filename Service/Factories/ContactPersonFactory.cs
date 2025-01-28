using Data.Entities;
using Service.Dtos;
using Service.Models;

namespace Service.Factories;

public static class ContactPersonFactory
{
    public static ContactPersonDto Create() => new ContactPersonDto();
    
    public static ContactPersonEntity Create(ContactPersonDto contactPersonDto) => new ContactPersonEntity();

    public static ContactPerson Create(ContactPersonEntity entity) =>
        entity is null
            ? throw new ArgumentNullException(nameof(entity))
            : new ContactPerson
            {
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber
            };
}