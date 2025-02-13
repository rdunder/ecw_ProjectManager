using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Data.Contexts;

public class DataContextFactory : IDesignTimeDbContextFactory<SqlDataContext>
{
    public SqlDataContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .AddEnvironmentVariables()
            .AddUserSecrets<DataContextFactory>()
            .Build();


        var optionsBuilder = new DbContextOptionsBuilder<SqlDataContext>();
        // optionsBuilder.UseSqlServer(configuration.GetConnectionString("EcwProjectManagerDb"));
        optionsBuilder.UseSqlServer(configuration.GetConnectionString("pmtest"));

        return new SqlDataContext(optionsBuilder.Options);
    }
}
