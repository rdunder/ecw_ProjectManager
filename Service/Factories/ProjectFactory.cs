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
                
                Status = StatusInfoFactory.Create(entity.Status),
                Customer = CustomerFactory.Create(entity.Customer),
                Service = ServiceInfoFactory.Create(entity.Service),
                ProjectManager = EmployeeFactory.Create(entity.ProjectManager)
            };
    
    
}