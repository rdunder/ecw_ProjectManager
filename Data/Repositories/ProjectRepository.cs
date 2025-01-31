using System.Diagnostics;
using System.Linq.Expressions;
using Data.Contexts;
using Data.Entities;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class ProjectRepository(SqlDataContext context) : 
    BaseRepository<ProjectEntity>(context),
    IProjectRepository
{
    
    public async Task<IEnumerable<ProjectEntity>> GetAllWithDetailsAsync()
    {
        try
        {
            var entities = await _context.Projects
                .Include(x => x.Status)
                .Include(x => x.Customer).ThenInclude(x => x.ContactPerson)
                .Include(x => x.Service)
                .Include(x => x.ProjectManager).ThenInclude(x => x.Role)
                .ToListAsync();
            return entities;
        }
        catch (Exception e)
        {
            Debug.WriteLine("Exception in GetAllProjectsIncludingAllPropertiesAsync");
            return null!;
        }
    }

    public async Task<ProjectEntity> GetWithDetailsAsync(Expression<Func<ProjectEntity, bool>>? expression)
    {
        if (expression == null) return null!;
        
        try
        {
            var entity = await _context.Projects
                .Include(x => x.Status)
                .Include(x => x.Customer).ThenInclude(x => x.ContactPerson)
                .Include(x => x.Service)
                .Include(x => x.ProjectManager).ThenInclude(x => x.Role)
                .FirstOrDefaultAsync(expression);
            
            return entity ?? null!;
        }
        catch (Exception e)
        {
            Debug.WriteLine("Exception in GetIncludingAllProperiesAsync");
            return null!;
        }
    }
}