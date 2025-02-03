using System.Collections;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Dtos;
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
        public async Task<IResult> Post([FromBody] ServiceInfoDto dto)
        {
            var result = await serviceInfoService.CreateAsync(dto);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<IResult> Put(int id, [FromBody] ServiceInfoDto dto)
        {
            var result = await serviceInfoService.UpdateAsync(id, dto);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            var result = await serviceInfoService.DeleteAsync(id);
            return result;
        }
    }
}
