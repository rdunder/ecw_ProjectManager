

using System.ComponentModel.DataAnnotations;

namespace Data.Entities;

public class RoleEntity
{
    [Key]
    public int Id { get; set; }
    
    [Required] [StringLength(20)]
    public string RoleName { get; set; } = null!;

    public ICollection<EmployeeEntity> Employees { get; set; } = new List<EmployeeEntity>();
}
