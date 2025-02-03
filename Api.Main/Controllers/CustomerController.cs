using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Dtos;
using Service.Interfaces;
using Service.Models;
using IResult = Service.Interfaces.IResult;

namespace Api.Main.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomerController(ICustomerService customerService) : ControllerBase
    {
        [HttpGet]
        public async Task<IResult<IEnumerable<Customer>>> Get()
        {
            var result = await customerService.GetAllCustomersIncludingContactPersonAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<IResult<Customer>> Get(int id)
        {
            var result = await customerService.GetByIdAsync(id);
            return result;
        }

        [HttpPost]
        public async Task<IResult> Post([FromBody] CustomerDto dto)
        {
            var result = await customerService.CreateAsync(dto);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<IResult> Put(int id, [FromBody] CustomerDto dto)
        {
            var result = await customerService.UpdateAsync(id, dto);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            var result = await customerService.DeleteAsync(id);
            return result;
        }
    }
}
