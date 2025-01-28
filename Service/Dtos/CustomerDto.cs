using System.ComponentModel.DataAnnotations;
using Data.Entities;

namespace Service.Dtos;

public class CustomerDto
{
    [Required] [MaxLength(100)]
    public string CompanyName { get; set; } = null!;
    
    [EmailAddress] [MaxLength(100)]
    public string Email { get; set; } = null!;

    public ContactPersonDto? ContactPerson { get; set; }
    
    // public ICollection<ProjectEntity> Projects { get; set; } = new List<ProjectEntity>();
}