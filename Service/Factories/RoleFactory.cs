using Data.Entities;
using Service.Dtos;
using Service.Models;

namespace Service.Factories;

public static class RoleFactory
{
    public static RoleDto Create() => new RoleDto();

    public static RoleEntity Create(RoleDto dto) =>
        dto is null
            ? throw new ArgumentNullException(nameof(dto))
            : new RoleEntity
            {
                RoleName = dto.RoleName
            };

    public static Role Create(RoleEntity entity) =>
        entity is null
            ? throw new ArgumentNullException(nameof(entity))
            : new Role()
            {
                Id = entity.Id,
                RoleName = entity.RoleName,
            };

    public static RoleEntity Create(Role role) =>
        role is null
            ? throw new ArgumentNullException(nameof(role))
            : new RoleEntity
            {
                Id = role.Id,
                RoleName = role.RoleName
            };
}