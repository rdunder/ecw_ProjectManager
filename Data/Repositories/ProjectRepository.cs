using Data.Contexts;
using Data.Entities;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public class ProjectRepository(SqlDataContext context) : 
    BaseRepository<ProjectEntity>(context),
    IProjectRepository
{
    
    private readonly SqlDataContext _context = context;
    
    
    
    public async Task<IEnumerable<ProjectEntity>> GetAllProjectsAndIncludesAsync()
    {
        try
        {
            var entities = await _context.Projects
                .Include(x => x.Status)
                .Include(x => x.Customer)
                .Include(x => x.Service)
                .Include(x => x.ProjectManager)
                .ToListAsync();
            return entities;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}