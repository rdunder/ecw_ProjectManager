using Data.Entities;
using Service.Dtos;
using Service.Models;

namespace Service.Factories;

public static class ProjectFactory
{
    public static ProjectDto Create() => new ProjectDto();

    public static ProjectEntity Create(ProjectDto dto) =>
        dto is null
            ? throw new ArgumentNullException(nameof(dto))
            : new ProjectEntity
            {
                ProjectName = dto.ProjectName,
                ProjectDescription = dto.ProjectDescription,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                
                StatusId = dto.StatusId,
                CustomerId = dto.CustomerId,
                ServiceId = dto.ServiceId,
                ProjectManagerId = dto.ProjectManagerId
            };

    public static Project Create(ProjectEntity entity) =>
        entity is null
            ? throw new ArgumentNullException(nameof(entity))
            : new Project()
            {
                ProjectId = entity.ProjectId,
                ProjectName = entity.ProjectName,
                ProjectDescription = entity.ProjectDescription,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                
                StatusId = entity.StatusId,
                CustomerId = entity.CustomerId,
                ServiceId = entity.ServiceId,
                ProjectManagerId = entity.ProjectManagerId
            };

    public static ProjectWithDetails CreateWithDetails(ProjectEntity entity) =>
        entity is null
            ? throw new ArgumentNullException(nameof(entity))
            : new ProjectWithDetails()
            {
                ProjectId = entity.ProjectId,
                ProjectName = entity.ProjectName,
                ProjectDescription = entity.ProjectDescription,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                
                Status = entity.Status.StatusName,
                Service = entity.Service.ServiceName,
                Price = entity.Service.Price,
                
                Customer = CustomerFactory.Create(entity.Customer),
                ProjectManager = EmployeeFactory.Create(entity.ProjectManager)
            };


}