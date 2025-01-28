using System.Linq.Expressions;

namespace Service.Interfaces;

public interface IService<TModel, TDto>
{
    public Task<bool> CreateAsync(TDto? dto);
    public Task<IEnumerable<TModel>> GetAllAsync();
    public Task<TModel> GetByIdAsync(int id);
    public Task<bool> UpdateAsync(TModel? model);
    public Task<bool> DeleteAsync(int id);
}