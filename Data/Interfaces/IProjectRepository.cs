using Data.Entities;

namespace Data.Interfaces;

public interface IProjectRepository : IBaseRepository<ProjectEntity>
{
    public Task<IEnumerable<ProjectEntity>> GetAllProjectsIncludingAllPropertiesAsync();
}