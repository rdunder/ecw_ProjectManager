using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.Models;
using IResult = Service.Interfaces.IResult;

namespace Api.Main.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeeController(IEmployeeService employeeService) : ControllerBase
    {
        [HttpGet]
        public async Task<IResult<IEnumerable<Employee>>> Get()
        {
            var result = await employeeService.GetEmployeesIncludingRoleAsync();
            return result;
        }
        
        [HttpGet("{id}")]
        public async Task<IResult<Employee>> Get(int id)
        {
            var result = await employeeService.GetEmployeeByIdIncludingRoleAsync(id);
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
