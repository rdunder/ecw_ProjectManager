using Data.Contexts;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;
using Service.Dtos;
using Service.Factories;
using Service.Helpers;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class ProjectService(
    IProjectRepository projectProjectRepository,
    IStatusInfoRepository statusInfoRepository,
    ICustomerRepository customerRepository,
    IServiceInfoRepository serviceInfoRepository,
    IEmployeeRepository employeeRepository) : IProjectService
{
    private readonly IProjectRepository _projectRepository = projectProjectRepository;
    private readonly IStatusInfoRepository _statusInfoRepository = statusInfoRepository;
    private readonly ICustomerRepository _customerRepository = customerRepository;
    private readonly IServiceInfoRepository _serviceInfoRepository = serviceInfoRepository;
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;
    
    
    public async Task<IResult> CreateAsync(ProjectDto? dto)
    {
        if (dto is null)
            return Result.BadRequest("Project Dto is null");
        
        if (await _statusInfoRepository.AlreadyExistsAsync(x => x.Id == dto.StatusId) == false)
            return Result.BadRequest("Status is not available");
        if (await _serviceInfoRepository.AlreadyExistsAsync(x => x.Id == dto.ServiceId) == false)
            return Result.BadRequest("Service is not available");
        if (await _customerRepository.AlreadyExistsAsync(x => x.Id == dto.CustomerId) == false)
            return Result.BadRequest("Customer is not available");
        if (await _employeeRepository.AlreadyExistsAsync(x => x.EmploymentNumber == dto.ProjectManagerId) == false)
            return Result.BadRequest("Employee (Project Manager) is not available");


        try
        {
            var entity = ProjectFactory.Create(dto);
            await _projectRepository.CreateAsync(entity);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"An error occured creating Project: {e.Message}");
        }
    }

    public async Task<IResult<IEnumerable<Project>>> GetAllAsync()
    {
        var projects = new List<Project>();
        
        try
        {
            var entities = await _projectRepository.GetAllAsync();
            projects.AddRange(entities.Select(entity => ProjectFactory.Create(entity)));
            return Result<IEnumerable<Project>>.Ok(projects);
        }
        catch (Exception e)
        {
            return Result<IEnumerable<Project>>.ExceptionError($"There was an error getting all Employees: {e.Message}");
        }
    }
    
    public async Task<IResult<IEnumerable<ProjectWithDetails>>> GetAllWithDetailsAsync()
    {
        var projects = new List<ProjectWithDetails>();
        
        try
        {
            var entities = await _projectRepository.GetAllAsync(query =>
                    query
                        .Include(x => x.Status)
                        .Include(x => x.Customer).ThenInclude(x => x.ContactPerson)
                        .Include(x => x.Service)
                        .Include(x => x.ProjectManager).ThenInclude(x => x.Role)
                    );
            projects.AddRange(entities.Select(entity => ProjectFactory.CreateWithDetails(entity)));
            return Result<IEnumerable<ProjectWithDetails>>.Ok(projects);
        }
        catch (Exception e)
        {
            return Result<IEnumerable<ProjectWithDetails>>.ExceptionError($"There was an error getting all Employees: {e.Message}");
        }
    }

    public async Task<IResult<Project>> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _projectRepository.GetAsync(x => x.ProjectId == id);
            return Result<Project>.Ok(ProjectFactory.Create(entity));
        }
        catch (Exception e)
        {
            return Result<Project>.ExceptionError($"There was an error getting Contact Person: {e.Message}");
        }
    }
    
    public async Task<IResult<ProjectWithDetails>> GetByIdWithDetailsAsync(int id)
    {
        try
        {
            var entity = await _projectRepository.GetAsync(x => x.ProjectId == id, query =>
                query
                    .Include(x => x.Status)
                    .Include(x => x.Customer).ThenInclude(x => x.ContactPerson)
                    .Include(x => x.Service)
                    .Include(x => x.ProjectManager).ThenInclude(x => x.Role)
                );
            return Result<ProjectWithDetails>.Ok(ProjectFactory.CreateWithDetails(entity));
        }
        catch (Exception e)
        {
            return Result<ProjectWithDetails>.ExceptionError($"There was an error getting Contact Person: {e.Message}");
        }
    }

    public async Task<IResult> UpdateAsync(int id, ProjectDto? dto)
    {
        if (dto is null)
            return Result.BadRequest("Project Dto is null");
                
        if (await _projectRepository.AlreadyExistsAsync(x => x.ProjectId == id) == false)
            return Result.AlreadyExists($"Project with id {id} does not exist");

        try
        {
            var entity = ProjectFactory.Create(dto);
            entity.ProjectId = id;
            
            await _projectRepository.UpdateAsync( (x => x.ProjectId == id), entity);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"There was an error updating Project: {e.Message}");
        }
    }

    public async Task<IResult> DeleteAsync(int id)
    {
        if (await _projectRepository.AlreadyExistsAsync(x => x.ProjectId == id) == false)
            return Result.BadRequest($"Project with id {id} does not exist");
        
        try
        { 
            await _projectRepository.DeleteAsync(x => x.ProjectId == id);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"There was an error deleting Project: {e.Message}");
        }
    }
}