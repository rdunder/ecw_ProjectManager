using System.ComponentModel.DataAnnotations;

namespace Data.Entities;

public class CustomerEntity
{
    public int Id { get; set; }
    
    [Required] [MaxLength(100)]
    public string CompanyName { get; set; } = null!;
    
    [EmailAddress] [MaxLength(100)]
    public string Email { get; set; } = null!;
    
    

    public ContactPersonEntity? ContactPerson { get; set; }
    
    public ICollection<ProjectEntity> Projects { get; set; } = new List<ProjectEntity>();
}