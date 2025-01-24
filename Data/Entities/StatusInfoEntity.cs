using System.ComponentModel.DataAnnotations;

namespace Data.Entities;

public class StatusInfoEntity
{
    [Key]
    public int Id { get; set; }
    
    [Required] [MaxLength(50)] 
    public string StatusName { get; set; }
    
    public ICollection<ProjectEntity> Projects { get; set; } = new List<ProjectEntity>();
}