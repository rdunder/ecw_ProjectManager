using Service.Dtos;
using Service.Models;

namespace Service.Interfaces;

public interface IProjectService : IService<Project, ProjectDto>
{
    public Task<IResult<IEnumerable<Project>>> GetAllProjectsIncludingAllPropertiesAsync();
}