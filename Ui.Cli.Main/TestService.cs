
using Data.Interfaces;
using Service.Interfaces;

namespace Ui.Cli.Main;

public class TestService
(
    IContactPersonRepository contactPersonRepository,
    ICustomerRepository customerRepository,
    IEmployeeRepository employeeRepository,
    IProjectRepository projectRepository,
    IRoleRepository roleRepository,
    IServiceInfoRepository serviceInfoRepository,
    IStatusInfoRepository statusInfoRepository,
    
    IEmployeeService employeeService
)

{
    private readonly IContactPersonRepository _contactPersonRepository = contactPersonRepository;
    private readonly ICustomerRepository _customerRepository = customerRepository;
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;
    private readonly IProjectRepository _projectRepository = projectRepository;
    private readonly IRoleRepository _roleRepository = roleRepository;
    private readonly IServiceInfoRepository _serviceInfoRepository = serviceInfoRepository;
    private readonly IStatusInfoRepository _statusInfoRepository = statusInfoRepository;
    
    private readonly IEmployeeService _employeeService = employeeService;

    
    public async Task DisplayAllData()
    {
        var employees = await _employeeService.GetEmployeesIncludingRoleAsync();
        foreach (var employee in employees)
        {
            Console.WriteLine(employee.FirstName);
            Console.WriteLine(employee.Role.RoleName);
            Console.WriteLine("\n");
        }
    }
}