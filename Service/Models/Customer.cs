using Data.Entities;

namespace Service.Models;

public class Customer
{
    public int Id { get; set; }
    
    public string CompanyName { get; set; } = null!;
    
    public string Email { get; set; } = null!;

    public IEnumerable<ContactPerson>? ContactPersons { get; set; }
}