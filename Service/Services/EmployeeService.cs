using Data.Interfaces;
using Service.Dtos;
using Service.Factories;
using Service.Helpers;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class EmployeeService(
    IEmployeeRepository employeeRepository, 
    IRoleRepository roleRepository)
    : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;
    private readonly IRoleRepository _roleRepository = roleRepository;
    
    
    public async Task<IResult> CreateAsync(EmployeeDto? dto)
    {
        if (dto is null)
            return Result.BadRequest("EmployeeDto is null");

        if (await _roleRepository.AlreadyExistsAsync(x => x.Id == dto.RoleId) == false)
            return Result.BadRequest($"Role with id {dto.RoleId} does not exist");

        if (await _employeeRepository.AlreadyExistsAsync(x => x.Email == dto.Email))
            return Result.AlreadyExists($"Employee with email {dto.Email} already exists");

        try
        {
            var entity = EmployeeFactory.Create(dto);
            await _employeeRepository.CreateAsync(entity);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"An error occured creating Employee: {e.Message}");
        }
    }

    public async Task<IResult<IEnumerable<Employee>>> GetAllAsync()
    {
        var employees = new List<Employee>();
        
        try
        {
            var entities = await _employeeRepository.GetAllAsync();
            employees.AddRange(entities.Select(entity => EmployeeFactory.Create(entity)));
            return Result<IEnumerable<Employee>>.Ok(employees);
        }
        catch (Exception e)
        {
            return Result<IEnumerable<Employee>>.ExceptionError($"There was an error getting all Employees: {e.Message}");
        }
    }

    public async Task<IResult<IEnumerable<Employee>>>  GetEmployeesIncludingRoleAsync()
    {
        var employees = new List<Employee>();
        
        try
        {
            var entities = await _employeeRepository.GetAllEmployeesIncludingRoleAsync();
            employees.AddRange(entities.Select(entity => EmployeeFactory.Create(entity)));
            return Result<IEnumerable<Employee>>.Ok(employees);
        }
        catch (Exception e)
        {
            return Result<IEnumerable<Employee>>.ExceptionError($"There was an error getting all Employees: {e.Message}");
        }
        
    }

    public async Task<IResult<Employee>> GetEmployeeByIdIncludingRoleAsync(int id)
    {
        try
        {
            var entity = await _employeeRepository.GetEmployeeByIdIncludingRoleAsync(id);
            var employee = EmployeeFactory.Create(entity);
            
            return Result<Employee>.Ok(employee);
        }
        catch (Exception e)
        {
            return Result<Employee>.ExceptionError($"There was an error getting Employee with id: {e.Message}");
        }
    }

    public async Task<IResult<Employee>> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _employeeRepository.GetAsync(x => x.EmploymentNumber == id);
            var employee = EmployeeFactory.Create(entity);
            
            return Result<Employee>.Ok(employee);
        }
        catch (Exception e)
        {
            return Result<Employee>.ExceptionError($"There was an error getting Employee with id: {e.Message}");
        }
    }

    public async Task<IResult> UpdateAsync(int id, EmployeeDto? dto)
    {
        if (dto is null)
            return Result.BadRequest("EmployeeDto is null");
                
        if (await _employeeRepository.AlreadyExistsAsync(x => x.EmploymentNumber == id) == false)
            return Result.AlreadyExists($"Employee with id {id} does not exist");

        try
        {
            var entity = EmployeeFactory.Create(dto);
            await _employeeRepository.UpdateAsync( (x => x.EmploymentNumber == id), entity);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"There was an error updating Employee: {e.Message}");
        }
    }

    public async Task<IResult> DeleteAsync(int id)
    {
        if (await _employeeRepository.AlreadyExistsAsync(x => x.EmploymentNumber == id) == false)
            return Result.BadRequest($"Employee with id {id} does not exist");
        
        try
        { 
            await _employeeRepository.DeleteAsync(x => x.EmploymentNumber == id);
            return Result.Ok();
        }
        catch (Exception e)
        {
            return Result.ExceptionError($"There was an error deleting Employee: {e.Message}");
        }
    }
}