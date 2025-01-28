using System.ComponentModel.DataAnnotations;
using Data.Entities;

namespace Service.Dtos;

public class RoleDto
{
    [Required] [StringLength(20)]
    public string RoleName { get; set; } = null!;

}