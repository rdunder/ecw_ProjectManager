using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.Models;
using IResult = Microsoft.AspNetCore.Http.IResult;

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
        public void Post([FromBody] string value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
