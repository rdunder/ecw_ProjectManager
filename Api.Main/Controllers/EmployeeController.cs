using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Dtos;
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
        [Authorize]
        public async Task<IResult> Post([FromBody] EmployeeDto dto)
        {
            var result = await employeeService.CreateAsync(dto);
            return result;
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IResult> Put(int id, [FromBody] EmployeeDto dto)
        {
            var result = await employeeService.UpdateAsync(id, dto);
            return result;
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IResult> Delete(int id)
        {
            var result = await employeeService.DeleteAsync(id);
            return result;
        }
    }
}
