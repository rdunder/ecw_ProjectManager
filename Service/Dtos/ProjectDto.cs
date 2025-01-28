using System.ComponentModel.DataAnnotations;
using Data.Entities;

namespace Service.Dtos;

public class ProjectDto
{
    [Required] [MaxLength(100)]
    public string ProjectName { get; set; } = null!;
    
    [Required] [MaxLength(500)]
    public string ProjectDescription { get; set; } = null!;
    
    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime EndDate { get; set; }
    
    
    
    public int StatusId { get; set; }
    public int CustomerId { get; set; }
    public int ServiceId { get; set; }
    public int ProjectManagerId { get; set; }
}