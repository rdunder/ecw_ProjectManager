using Data.Entities;

namespace Service.Models;

public class Customer
{
    public int Id { get; set; }
    
    public string CompanyName { get; set; } = null!;
    
    public string Email { get; set; } = null!;

    public ContactPerson? ContactPerson { get; set; }
    
    public ICollection<Project> Projects { get; set; } = new List<Project>();
}