using Data.Entities;

namespace Service.Models;

public class Employee
{
    public int EmploymentNumber { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;

    public int RoleId { get; set; }
    public Role Role { get; set; } = null!;
    
    //public ICollection<Project> Projects { get; set; } = new List<Project>();
}