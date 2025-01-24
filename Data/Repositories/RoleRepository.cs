using Data.Contexts;
using Data.Entities;
using Data.Interfaces;

namespace Data.Repositories;

public class RoleRepository(SqlDataContext context) :
    BaseRepository<RoleEntity>(context),
    IRoleRepository
{
    
}