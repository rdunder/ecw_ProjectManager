using System.ComponentModel.DataAnnotations;
using Data.Entities;

namespace Service.Models;

public class Role
{
    public int Id { get; set; }
    public string RoleName { get; set; } = null!;

    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}