using Data.Contexts;
using Data.Entities;
using Data.Interfaces;

namespace Data.Repositories;

public class ServiceInfoRepository(SqlDataContext context) :
    BaseRepository<ServiceInfoEntity>(context),
    IServiceInfoRepository
{
    
}