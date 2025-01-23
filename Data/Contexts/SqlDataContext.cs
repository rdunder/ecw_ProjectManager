

using Microsoft.EntityFrameworkCore;

namespace Data.Contexts;

public class SqlDataContext(DbContextOptions options) : DbContext(options)
{
}
