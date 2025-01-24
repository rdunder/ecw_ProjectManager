using System.ComponentModel.DataAnnotations;

namespace Data.Entities;

public class ProjectEntity
{
    [Key]
    public int ProjectId { get; set; }
    
    [Required] [MaxLength(100)]
    public string ProjectName { get; set; } = null!;
    
    [Required] [MaxLength(500)]
    public string ProjectDescription { get; set; } = null!;
    
    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime EndDate { get; set; }
    
    
    
    public int StatusId { get; set; }
    public StatusInfoEntity Status { get; set; } = null!;

    public int CustomerId { get; set; }
    public CustomerEntity Customer { get; set; } = null!;

    public int ServiceId { get; set; }
    public ServiceInfoEntity Service { get; set; } = null!;

    public int ProjectManagerId { get; set; }
    public EmployeeEntity ProjectManager { get; set; } = null!;
}