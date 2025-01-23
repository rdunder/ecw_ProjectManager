using System.ComponentModel.DataAnnotations;

namespace Data.Entities;

public class ContactPersonEntity
{
    public int Id { get; set; }
    
    [Required] [MaxLength(50)]
    public string FirstName { get; set; } = null!;
    
    [Required] [MaxLength(50)]
    public string LastName { get; set; } = null!;
    
    [Required] [EmailAddress] [MaxLength(100)]
    public string Email { get; set; } = null!;
    
    [Required] [MaxLength(25)]
    public string PhoneNumber { get; set; } = null!;

    public int CustomerId { get; set; }
    public CustomerEntity Customer { get; set; } = null!;
}