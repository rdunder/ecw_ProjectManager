using Data.Entities;
using Data.Interfaces;

namespace Ui.Cli.Main;

public class ProjectTestService(
    IProjectRepository projectRepository,
    IStatusInfoRepository statusInfoRepository
    )
{
    private readonly IProjectRepository _projectRepo = projectRepository;
    private readonly IStatusInfoRepository _statusRepo = statusInfoRepository;

    public async Task<bool> AddTestProjectAsync()
    {
        var customer = new CustomerEntity
        {
            CompanyName = "Test2 AB",
            Email = "test.test@test.com",
        };

        var service = new ServiceInfoEntity
        {
            ServiceName = "Test Service2",
            Price = 3750
        };

        var role = new RoleEntity
        {
            RoleName = "Test Role2",
        };

        var manager = new EmployeeEntity
        {
            FirstName = "Test First Name2",
            LastName = "Test Last Name2",
            Email = "test.test@test.com",
            PhoneNumber = "123456789",
            Role = role
        };
        
        var project = new ProjectEntity
        {
            ProjectName = "TestProject2",
            ProjectDescription = "TestProjectDescription2",
            StartDate = DateTime.Now,
            EndDate = DateTime.Now.AddDays(2),
            Status = await _statusRepo.GetAsync(x => x.Id == 2),
            Customer = customer,
            Service = service,
            ProjectManager = manager
        };

        try
        {
            await _projectRepo.CreateAsync(project);
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Failed to add test project :: {e.Message}");
            return false;
        }
    }

    public async Task DisplayProjectsAsync()
    {
        var projects = await _projectRepo.GetAllAsync();
        foreach (var project in projects)
        {
            Console.WriteLine($"Project :: {project.ProjectName}");
        }
    }

}