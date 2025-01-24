using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Data.Entities;

public class ServiceInfoEntity
{
    public int Id { get; set; }
    
    [Required] [StringLength(100)]
    public string ServiceName { get; set; } = null!;

    [Required] [Precision(18, 2)]
    public decimal Price { get; set; }
    
    public ICollection<ProjectEntity> Projects { get; set; } = new List<ProjectEntity>();
}