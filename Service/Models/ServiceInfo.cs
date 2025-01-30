using Data.Entities;

namespace Service.Models;

public class ServiceInfo
{
    public int Id { get; set; }
    public string ServiceName { get; set; } = null!;
    public decimal Price { get; set; }
    
    //public ICollection<Project> Projects { get; set; } = new List<Project>();
}