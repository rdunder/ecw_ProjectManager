using Data.Contexts;
using Data.Entities;
using Data.Interfaces;

namespace Data.Repositories;

public class ContactPersonRepository(SqlDataContext context) :
    BaseRepository<ContactPersonEntity>(context),
    IContactPersonRepository
{
    
}