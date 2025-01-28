using Data.Entities;
using Service.Dtos;
using Service.Models;

namespace Service.Factories;

public static class ServiceInfoFactory
{
    public static ServiceInfoDto Create() => new ServiceInfoDto();
    
    public static ServiceInfoEntity Create(ServiceInfoDto dto) =>
        dto is null
            ? throw new ArgumentNullException(nameof(dto))
            : new ServiceInfoEntity()
            {
                ServiceName = dto.ServiceName,
                Price = dto.Price,
            };

    public static ServiceInfo Create(ServiceInfoEntity entity) =>
        entity is null
            ? throw new ArgumentNullException(nameof(entity))
            : new ServiceInfo()
            {
                Id = entity.Id,
                ServiceName = entity.ServiceName,
                Price = entity.Price
            };

    public static ServiceInfoEntity Create(ServiceInfo model) =>
        model is null
            ? throw new ArgumentNullException(nameof(model))
            : new ServiceInfoEntity()
            {
                Id = model.Id,
                ServiceName = model.ServiceName,
                Price = model.Price
            };
}