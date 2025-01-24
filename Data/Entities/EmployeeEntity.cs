using System.ComponentModel.DataAnnotations;

namespace Data.Entities;

public class EmployeeEntity
{
    [Key]
    public int EmploymentNumber { get; set; }

    [Required] [MaxLength(50)] 
    public string FirstName { get; set; } = null!;
    
    [Required] [MaxLength(50)]
    public string LastName { get; set; } = null!;

    [Required] [MaxLength(100)]
    public string Email { get; set; } = null!;
    
    [Required] [MaxLength(25)]
    public string PhoneNumber { get; set; } = null!;

    public int RoleId { get; set; }
    public RoleEntity Role { get; set; } = null!;
    
    public ICollection<ProjectEntity> Projects { get; set; } = new List<ProjectEntity>();
}