using Service.Dtos;
using Service.Interfaces;
using Service.Models;

namespace Service.Services;

public class ContactPersonService : IContactPersonService
{
    public Task<IResult> CreateAsync(ContactPersonDto? dto)
    {
        throw new NotImplementedException();
    }

    public Task<IResult<IEnumerable<ContactPerson>>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<IResult<ContactPerson>> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IResult> UpdateAsync(ContactPerson? model)
    {
        throw new NotImplementedException();
    }

    public Task<IResult> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
}