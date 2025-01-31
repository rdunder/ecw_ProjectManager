using System.Diagnostics;
using System.Linq.Expressions;
using Data.Contexts;
using Data.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories;

public abstract class BaseRepository<TEntity>(SqlDataContext context) 
    : IBaseRepository<TEntity> where TEntity : class
{
    protected readonly SqlDataContext _context = context;
    protected readonly DbSet<TEntity> _dbSet = context.Set<TEntity>();


    public virtual async Task<TEntity> CreateAsync(TEntity entity)
    {
        if (entity == null) return null!;

        try
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        catch (Exception e)
        {
            Debug.WriteLine($"Error creating {nameof(TEntity)} entity: {e.Message}");
            return null!;
        }
    }

    public virtual async Task<IEnumerable<TEntity>> GetAllAsync(Func<IQueryable<TEntity>, IQueryable<TEntity>>? includeExpression = null)
    {
        try
        {
            if (includeExpression == null) 
                return await _dbSet.ToListAsync();
            
            IQueryable<TEntity> query = _dbSet;
            query = includeExpression(query);
            return await query.ToListAsync();
        }
        catch (Exception e)
        {
            Debug.WriteLine($"Error getting all {nameof(TEntity)} entities: {e.Message}");
            return null!;
        }
    }

    public virtual async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> expression, Func<IQueryable<TEntity>, IQueryable<TEntity>>? includeExpression = null)
    {
        if (expression == null) return null!;

        try
        {
            if (includeExpression == null) 
                return await _dbSet.FirstOrDefaultAsync(expression) ?? null!;
            
            IQueryable<TEntity> query = _dbSet;
            query = includeExpression(query);
            return await query.FirstOrDefaultAsync(expression) ?? null!;
        }
        catch (Exception e)
        {
            Debug.WriteLine($"Error getting {nameof(TEntity)} entity: {e.Message}");
            throw;
        }
    }

    public virtual async Task<TEntity> UpdateAsync(Expression<Func<TEntity, bool>> expression, TEntity entity)
    {
        if (entity == null || expression == null) return null!;

        try
        {
            var existingEntity = await _dbSet.FirstOrDefaultAsync(expression);
            if (existingEntity == null) return null!;
            
            _context.Entry(existingEntity).CurrentValues.SetValues(entity);
            
            var rowsAffected = await _context.SaveChangesAsync();
            return existingEntity;
        }
        catch (Exception e)
        {
            Debug.WriteLine($"Error updating {nameof(TEntity)} entity: {e.Message}");
            return null!;
        }
    }

    public virtual async Task<bool> DeleteAsync(Expression<Func<TEntity, bool>> expression)
    {
        if (expression == null) return false;

        try
        {
            var existingEntity = await _dbSet.FirstOrDefaultAsync(expression);
            if (existingEntity == null) return false;
            
            _dbSet.Remove(existingEntity);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            Debug.WriteLine($"Error deleting {nameof(TEntity)} entity: {e.Message}");
            return false;
        }
    }

    public virtual async Task<bool> AlreadyExistsAsync(Expression<Func<TEntity, bool>> expression)
    {
        if (expression == null) return false;
        return await _dbSet.AnyAsync(expression);
    }
}

