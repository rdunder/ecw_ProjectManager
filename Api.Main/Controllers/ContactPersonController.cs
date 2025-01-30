using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.Models;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Api.Main.Controllers
{
    [Route("api/contact-persons")]
    [ApiController]
    public class ContactPersonController(IContactPersonService contactPersonService) : ControllerBase
    {
        [HttpGet]
        public async Task<IResult<IEnumerable<ContactPerson>>> Get()
        {
            var result = await contactPersonService.GetAllAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<IResult<ContactPerson>> Get(int id)
        {
            var result = await contactPersonService.GetByIdAsync(id);
            return result;
        }

        // POST api/<ContactPersonController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ContactPersonController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ContactPersonController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
