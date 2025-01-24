

using Data.Contexts;
using Data.Interfaces;
using Data.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Ui.Cli.Main;

internal class Program
{
    public static async Task Main(string[] args)
    {
        var host = Host.CreateDefaultBuilder(args)
            .ConfigureAppConfiguration(config => { config.AddUserSecrets<Program>(); })
            .ConfigureServices( (context, services) =>
            {
                var conStr = context.Configuration.GetConnectionString("DefaultConnection") ?? throw new NullReferenceException("Connection string not found");
                
                //  Add DbContext (SqlDataContext) to services
                services.AddDbContext<SqlDataContext>(opt =>
                    opt.UseSqlServer(conStr));
                
                //  Add Repositories to services
                services.AddScoped<IContactPersonRepository, ContactPersonRepository>();
                services.AddScoped<ICustomerRepository, CustomerRepository>();
                services.AddScoped<IEmployeeRepository, EmployeeRepository>();
                services.AddScoped<IProjectRepository, ProjectRepository>();
                services.AddScoped<IRoleRepository, RoleRepository>();
                services.AddScoped<IServiceInfoRepository, ServiceInfoRepository>();
                services.AddScoped<IStatusInfoRepository, StatusInfoRepository>();

                services.AddScoped<ProjectTestService>();

            })
            .Build();
        
        var testService = host.Services.GetService<ProjectTestService>();

        bool isSuccess = await testService.AddTestProjectAsync();
        
        if (isSuccess)
        {
            Console.WriteLine("Successfully added test project");
        }
        else
        {
            Console.WriteLine("Failed to add test project");
        }
    }
}
    