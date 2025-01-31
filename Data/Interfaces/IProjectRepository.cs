using System.Linq.Expressions;
using Data.Entities;

namespace Data.Interfaces;

public interface IProjectRepository : IBaseRepository<ProjectEntity>
{
    public Task<IEnumerable<ProjectEntity>> GetAllWithDetailsAsync();
    public Task<ProjectEntity> GetWithDetailsAsync(Expression<Func<ProjectEntity, bool>>? expression);
}