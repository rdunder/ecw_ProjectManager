using Service.Dtos;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class ContactPersonService : IContactPersonService
{
    public Task<bool> CreateAsync(ContactPersonDto dto)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<ContactPerson>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<ContactPerson> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAsync(ContactPerson model)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}