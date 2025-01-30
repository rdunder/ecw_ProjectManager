using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using Service.Models;

namespace Api.Main.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectController(IProjectService projectService) : ControllerBase
    {
        private readonly IProjectService _projectService = projectService;
        
        [HttpGet]
        public async Task<IResult<IEnumerable<Project>>> Get()
        {
            var result = await _projectService.GetAllAsync();
            return result;
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
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
