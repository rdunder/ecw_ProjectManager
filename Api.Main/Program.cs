using System.Text.Json.Serialization;
using Data.Contexts;
using Data.Interfaces;
using Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Service.Interfaces;
using Service.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.WriteIndented = true;
        opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddOpenApi();

var connStr = builder.Configuration.GetConnectionString("EcwProjectManagerDb") ?? throw new NullReferenceException("Connection string is null");

builder.Services.AddDbContext<SqlDataContext>(opt =>
    opt.UseSqlServer(connStr));

builder.Services.AddScoped<IContactPersonRepository, ContactPersonRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IServiceInfoRepository, ServiceInfoRepository>();
builder.Services.AddScoped<IStatusInfoRepository, StatusInfoRepository>();

builder.Services.AddScoped<IContactPersonService, ContactPersonService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IServiceInfoService, ServiceInfoService>();
builder.Services.AddScoped<IStatusInfoService, StatusInfoService>();



var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
