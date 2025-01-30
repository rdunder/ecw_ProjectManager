using Data.Entities;

namespace Service.Models;

public class StatusInfo
{
    public int Id { get; set; }
    public string StatusName { get; set; } = null!;
    
    //public ICollection<Project> Projects { get; set; } = new List<Project>();
}