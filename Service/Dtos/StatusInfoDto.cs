using System.ComponentModel.DataAnnotations;
using Data.Entities;

namespace Service.Dtos;

public class StatusInfoDto
{
    [Required] [MaxLength(50)] 
    public string StatusName { get; set; }
}