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
    
    
    public Task<IResult> CreateAsync(ProjectDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<IResult<IEnumerable<Project>>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<IResult<Project>> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IResult> UpdateAsync(Project model)
    {
        throw new NotImplementedException();
    }

    public Task<IResult> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}