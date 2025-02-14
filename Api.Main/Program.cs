using System.Net;
using System.Text.Json.Serialization;
using Api.Main.Services;
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

builder.Services.AddApiKeyAuthentication();



var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(x => x
    .SetIsOriginAllowed(origin => 
    {
        if (string.IsNullOrEmpty(origin)) return true;
        
        var uri = new Uri(origin);
        return uri.Host == "projectmanager.hajt.se" ||
               uri.Host == "www.projectmanager.hajt.se" ||
               uri.Host == "localhost" ||
               uri.Host == "127.0.0.1" ||
               uri.Host.StartsWith("192.168.50.");
    })
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());

// app.UseCors(x => x
//     .AllowAnyHeader()
//     .AllowAnyMethod()
//     .AllowAnyOrigin()
//     .AllowCredentials());

app.UseMiddleware<ApiKeyMiddleware>();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
