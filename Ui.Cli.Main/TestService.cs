
using Data.Interfaces;
using Service.Helpers;
using Service.Interfaces;
using Service.Models;

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
    
    IEmployeeService employeeService,
    IStatusInfoService statusInfoService,
    IServiceInfoService serviceInfoService,
    IRoleService roleService
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
    private readonly IStatusInfoService _statusInfoService = statusInfoService;
    private readonly IServiceInfoService _serviceInfoService = serviceInfoService;
    private readonly IRoleService _roleService = roleService;
    

    
    public async Task DisplayAllData()
    {
        var result = await _employeeService.GetEmployeesIncludingRoleAsync();
        if (result.Success && result.Data != null)
        {
            IEnumerable<Employee> emp = result.Data;
            foreach (var employee in emp)
            {
                Console.WriteLine($"{employee.Role.RoleName}");
                Console.WriteLine($"{employee.FirstName} {employee.LastName} - <{employee.Email}>\n");
            }
            
        }
    }
}