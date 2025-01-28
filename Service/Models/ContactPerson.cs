using Data.Entities;

namespace Service.Models;

public class ContactPerson
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public int CustomerId { get; set; }
}