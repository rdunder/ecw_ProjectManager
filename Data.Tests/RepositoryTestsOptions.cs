using Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Data.Tests;

public abstract class RepositoryTestsOptions
{

    protected readonly SqlDataContext _context;

    public RepositoryTestsOptions()
    {
        var opt = new DbContextOptionsBuilder<SqlDataContext>()
            .UseInMemoryDatabase($"{Guid.NewGuid}_{nameof(_context)}")
            .Options;

        _context = new SqlDataContext(opt);
    }
}
