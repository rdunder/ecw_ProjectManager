using Data.Entities;
using Service.Dtos;
using Service.Models;

namespace Service.Factories;

public static class StatusInfoFactory
{
    public static StatusInfoDto Create() => new StatusInfoDto();
    
    public static StatusInfoEntity Create(StatusInfoDto dto) =>
        dto is null
            ? throw new ArgumentNullException(nameof(dto))
            : new StatusInfoEntity
            {
                StatusName = dto.StatusName
            };

    public static StatusInfo Create(StatusInfoEntity entity) =>
        entity is null
            ? throw new ArgumentNullException(nameof(entity))
            : new StatusInfo()
            {
                Id = entity.Id,
                StatusName = entity.StatusName
            };

    public static StatusInfoEntity Create(StatusInfo model) =>
        model is null
            ? throw new ArgumentNullException(nameof(model))
            : new StatusInfoEntity()
            {
                Id = model.Id,
                StatusName = model.StatusName
            };
}