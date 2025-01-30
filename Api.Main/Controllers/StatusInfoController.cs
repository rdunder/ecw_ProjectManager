using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Helpers;
using Service.Interfaces;
using Service.Models;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Api.Main.Controllers
{
    [Route("api/Statuses")]
    [ApiController]
    public class StatusInfoController(IStatusInfoService statusInfoService) : ControllerBase
    {
        [HttpGet]
        public async Task<IResult<IEnumerable<StatusInfo>>> Get()
        {
            var result = await statusInfoService.GetAllAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<IResult<StatusInfo>> Get(int id)
        {
            var result = await statusInfoService.GetByIdAsync(id);
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
