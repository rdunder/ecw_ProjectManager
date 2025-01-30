using System.Linq.Expressions;
using Data.Entities;

namespace Data.Interfaces;

public interface IProjectRepository : IBaseRepository<ProjectEntity>
{
    public Task<IEnumerable<ProjectEntity>> GetAllProjectsIncludingAllPropertiesAsync();
    public Task<ProjectEntity> GetIncludingAllPropertiesAsync(Expression<Func<ProjectEntity, bool>>? expression);
}