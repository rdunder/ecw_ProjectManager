using Data.Entities;
using Data.Interfaces;

namespace Ui.Cli.Main;

public class TestService
(
    IContactPersonRepository contactPersonRepository,
    ICustomerRepository customerRepository,
    IEmployeeRepository employeeRepository,
    IProjectRepository projectRepository,
    IRoleRepository roleRepository,
    IServiceInfoRepository serviceInfoRepository,
    IStatusInfoRepository statusInfoRepository
)

{
    private readonly IContactPersonRepository _contactPersonRepository = contactPersonRepository;
    private readonly ICustomerRepository _customerRepository = customerRepository;
    private readonly IEmployeeRepository _employeeRepository = employeeRepository;
    private readonly IProjectRepository _projectRepository = projectRepository;
    private readonly IRoleRepository _roleRepository = roleRepository;
    private readonly IServiceInfoRepository _serviceInfoRepository = serviceInfoRepository;
    private readonly IStatusInfoRepository _statusInfoRepository = statusInfoRepository;

    
    public async Task DisplayAllData()
    {
        var customers = await _customerRepository.GetAllCustomersIncludingContactPersonAsync();
        var employees = await _employeeRepository.GetAllAsync();
        var services = await _serviceInfoRepository.GetAllAsync();
        var statuses = await _statusInfoRepository.GetAllAsync();

        foreach (var customer in customers)
        {
            Console.WriteLine(@$"
Customer: {customer.CompanyName} <{customer.Email}>
ContactPerson: {customer.ContactPerson.FirstName} {customer.ContactPerson.LastName}
<{customer.ContactPerson.Email}>
{customer.ContactPerson.PhoneNumber}

");
        }

        foreach (var employee in employees)
        {
            var role = await _roleRepository.GetAsync(x => x.Id == employee.RoleId);
            Console.WriteLine(employee.FirstName);
            Console.WriteLine(role.RoleName);
        }
    }
}