using Data.Contexts;
using Data.Entities;
using Data.Interfaces;

namespace Data.Repositories;

public class StatusInfoRepository(SqlDataContext context) :
    BaseRepository<StatusInfoEntity>(context),
    IStatusInfoRepository
{
    
}