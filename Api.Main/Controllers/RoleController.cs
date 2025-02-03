using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Dtos;
using Service.Interfaces;
using Service.Models;
using IResult = Service.Interfaces.IResult;

namespace Api.Main.Controllers
{
    [Route("api/roles")]
    [ApiController]
    public class RoleController(IRoleService roleService) : ControllerBase
    {
        [HttpGet]
        public async Task<IResult<IEnumerable<Role>>> Get()
        {
            var result = await roleService.GetAllAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<IResult<Role>> Get(int id)
        {
            var result = await roleService.GetByIdAsync(id);
            return result;
        }

        [HttpPost]
        public async Task<IResult> Post([FromBody] RoleDto dto)
        {
            var result = await roleService.CreateAsync(dto);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<IResult> Put(int id, [FromBody] RoleDto dto)
        {
            var result = await roleService.UpdateAsync(id, dto);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            var result = await roleService.DeleteAsync(id);
            return result;
        }
    }
}
