using Data.Entities;

namespace Service.Models;

public class Project
{
    public int ProjectId { get; set; }
    public string ProjectName { get; set; } = null!;
    public string ProjectDescription { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public StatusInfo? Status { get; set; }
    public Customer? Customer { get; set; }
    public ServiceInfo? Service { get; set; }
    public Employee? ProjectManager { get; set; }
}