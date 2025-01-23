using System.ComponentModel.DataAnnotations;

namespace Data.Entities;

public class ServiceInfoEntity
{
    public int Id { get; set; }
    
    [Required] [StringLength(100)]
    public string ServiceName { get; set; }

    [Required]
    public decimal Price { get; set; }
    
    // public virtual ICollection<ProjectEntity> Projects { get; set; } = new List<ProjectEntity>();
}