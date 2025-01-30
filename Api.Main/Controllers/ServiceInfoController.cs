using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.Models;
using IResult = Service.Interfaces.IResult;

namespace Api.Main.Controllers
{
    [Route("api/services")]
    [ApiController]
    public class ServiceInfoController(IServiceInfoService serviceInfoService) : ControllerBase
    {
        [HttpGet]
        public async Task<IResult<IEnumerable<ServiceInfo>>> Get()
        {
            var result = await serviceInfoService.GetAllAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<IResult<ServiceInfo>> Get(int id)
        {
            var result = await serviceInfoService.GetByIdAsync(id);
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
