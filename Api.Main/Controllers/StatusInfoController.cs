
using Microsoft.AspNetCore.Mvc;
using Service.Dtos;
using Service.Interfaces;
using Service.Models;
using IResult = Service.Interfaces.IResult;

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
        public async Task<IResult> Post([FromBody] StatusInfoDto dto)
        {
            var result = await statusInfoService.CreateAsync(dto);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<IResult> Put(int id, [FromBody] StatusInfoDto dto)
        {
            var result = await statusInfoService.UpdateAsync(id, dto);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            var result = await statusInfoService.DeleteAsync(id);
            return result;
        }
    }
}
