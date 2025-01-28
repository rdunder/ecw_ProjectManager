using Data.Contexts;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Service.Dtos;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class ProjectService(IProjectRepository projectRepository) : IProjectService
{
    private IProjectRepository _repository = projectRepository;
    
    
    public Task<bool> CreateAsync(ProjectDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Project>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Project> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAsync(ProjectDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}