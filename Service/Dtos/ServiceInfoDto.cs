using System.ComponentModel.DataAnnotations;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Service.Dtos;

public class ServiceInfoDto
{
    [Required] [StringLength(100)]
    public string ServiceName { get; set; } = null!;

    [Required] [Precision(18, 2)]
    public decimal Price { get; set; }
}