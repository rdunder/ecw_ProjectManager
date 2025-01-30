using Data.Entities;
using Service.Dtos;
using Service.Models;

namespace Service.Factories;

public static class ContactPersonFactory
{
    public static ContactPersonDto Create() => new ContactPersonDto();

    public static ContactPersonEntity Create(ContactPersonDto dto) =>
        dto is null
            ? throw new ArgumentNullException(nameof(dto))
            : new ContactPersonEntity()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                CustomerId = dto.CustomerId
            };

    public static ContactPerson Create(ContactPersonEntity entity) =>
        entity is null
            ? throw new ArgumentNullException(nameof(entity))
            : new ContactPerson
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber,
                CustomerId = entity.CustomerId
            };
}