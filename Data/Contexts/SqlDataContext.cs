

using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.Contexts;

public class SqlDataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<RoleEntity> Roles { get; set; }
    public DbSet<EmployeeEntity> Employees { get; set; }
    public DbSet<StatusInfoEntity> StatusInfos { get; set; }
    public DbSet<ServiceInfoEntity> ServiceInfos { get; set; }
    public DbSet<ContactPersonEntity> ContactPersons { get; set; }
    public DbSet<CustomerEntity> Customers { get; set; }
    public DbSet<ProjectEntity> Projects { get; set; }
}
