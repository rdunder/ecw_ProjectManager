using Data.Entities;
using Service.Dtos;
using Service.Models;

namespace Service.Factories;

public static class EmployeeFactory
{
    public static EmployeeDto Create() => new EmployeeDto();

    public static EmployeeEntity Create(EmployeeDto dto) =>
        dto is null
            ? throw new ArgumentNullException(nameof(dto))
            : new EmployeeEntity()
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                RoleId = dto.RoleId
            };

    public static Employee Create(EmployeeEntity entity) =>
        entity is null
            ? throw new ArgumentNullException(nameof(entity))
            : new Employee
            {
                EmploymentNumber = entity.EmploymentNumber,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Email = entity.Email,
                PhoneNumber = entity.PhoneNumber,
                RoleId = entity.RoleId,
                Role = RoleFactory.Create(entity.Role)
            };

    public static EmployeeEntity Create(Employee model) =>
        model is null
            ? throw new ArgumentNullException(nameof(model))
            : new EmployeeEntity()
            {
                EmploymentNumber = model.EmploymentNumber,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber,
                RoleId = model.RoleId,
            };
}