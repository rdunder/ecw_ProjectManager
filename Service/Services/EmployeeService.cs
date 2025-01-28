using System.Diagnostics;
using Data.Interfaces;
using Microsoft.Extensions.Logging;
using Service.Dtos;
using Service.Factories;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class EmployeeService(
    IEmployeeRepository employeeRepository, 
    IRoleRepository roleRepository,
    ILogger<EmployeeService> logger)
    : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;
    private readonly IRoleRepository _roleRepository = roleRepository;
    private readonly ILogger<EmployeeService> _logger = logger;
    
    
    public async Task<bool> CreateAsync(EmployeeDto? dto)
    {
        if (dto is null)
        {
            Debug.WriteLine("EmployeeDto is null :: in EmployeeService.CreateAsync");
            return false;
        }

        if (await _roleRepository.AlreadyExistsAsync(x => x.Id == dto.RoleId) == false)
        {
            Debug.WriteLine("RoleId is not found :: in EmployeeService.CreateAsync");
            return false;
        }

        if (await _employeeRepository.AlreadyExistsAsync(x => x.Email == dto.Email) == true)
        {
            Debug.WriteLine("Employee with Email already exists :: in EmployeeService.CreateAsync");
            return false;
        }

        try
        {
            var entity = EmployeeFactory.Create(dto);
            await _employeeRepository.CreateAsync(entity);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"An error occured creating Employee: {e.Message}");
            return false;
        }
    }

    public async Task<IEnumerable<Employee>> GetAllAsync()
    {
        try
        {
            var entities = await _employeeRepository.GetAllAsync();
            return entities.Select(entity => EmployeeFactory.Create(entity));
        }
        catch (Exception e)
        {
            Console.WriteLine($"there was an error getting all Employees: {e.Message}");
            return [];
        }
    }

    public async Task<IEnumerable<Employee>> GetEmployeesIncludingRoleAsync()
    {
        try
        {
            var entities = await _employeeRepository.GetAllEmployeesIncludingRoleAsync();
            return entities.Select(entity => EmployeeFactory.Create(entity)).ToList();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        
    }

    public async Task<Employee> GetByIdAsync(int id)
    {
        try
        {
            var entity = await _employeeRepository.GetAsync(x => x.EmploymentNumber == id);
            return EmployeeFactory.Create(entity);
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was an error getting Employee with id: {e.Message}");
            return null!;
        }
    }

    public async Task<bool> UpdateAsync(Employee? model)
    {
        if (model is null || await _employeeRepository.AlreadyExistsAsync(x => x.EmploymentNumber == model.EmploymentNumber) == false)
            return false;

        try
        {
            var entity = EmployeeFactory.Create(model);
            await _employeeRepository.UpdateAsync( (x => x.EmploymentNumber == model.EmploymentNumber), entity);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"There was an error updating Employee with id: {e.Message}");
            return false;
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        if (await _employeeRepository.AlreadyExistsAsync(x => x.EmploymentNumber == id) == false)
            return false;
        
        try
        { 
            return await _employeeRepository.DeleteAsync(x => x.EmploymentNumber == id);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }
}