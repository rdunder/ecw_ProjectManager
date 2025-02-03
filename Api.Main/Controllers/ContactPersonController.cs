
using Microsoft.AspNetCore.Mvc;
using Service.Dtos;
using Service.Interfaces;
using Service.Models;
using IResult = Service.Interfaces.IResult;

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

        [HttpPost]
        public async Task<IResult> Post([FromBody] ContactPersonDto dto)
        {
            var result = await contactPersonService.CreateAsync(dto);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<IResult> Put(int id, [FromBody] ContactPersonDto dto)
        {
            var result = await contactPersonService.UpdateAsync(id, dto);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            var result = await contactPersonService.DeleteAsync(id);
            return result;
        }
    }
}
