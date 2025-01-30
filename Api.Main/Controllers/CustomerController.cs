using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
            var result = await customerService.GetAllAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<IResult<Customer>> Get(int id)
        {
            var result = await customerService.GetByIdAsync(id);
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
