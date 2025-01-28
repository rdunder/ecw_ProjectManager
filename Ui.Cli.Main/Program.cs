

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

                services.AddScoped<TestService>();

            })
            .Build();
        
        var testService = host.Services.GetService<TestService>();
        await testService.DisplayAllData();
        Console.WriteLine("done");
    }
}
    