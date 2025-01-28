using Data.Entities;
using Service.Dtos;

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
}