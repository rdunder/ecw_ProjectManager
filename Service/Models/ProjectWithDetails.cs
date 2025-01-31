namespace Service.Models;
//  This model should include all the details, all the includes from the other tables.
public class ProjectWithDetails
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