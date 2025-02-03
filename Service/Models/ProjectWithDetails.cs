namespace Service.Models;
public class ProjectWithDetails
{
    public int ProjectId { get; set; }
    public string ProjectName { get; set; } = null!;
    public string ProjectDescription { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public string Status { get; set; } = null!;
    public string Service { get; set; } = null!;
    public decimal Price { get; set; }
    public Customer? Customer { get; set; }
    public Employee? ProjectManager { get; set; }
}