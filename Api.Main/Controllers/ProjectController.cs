using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Dtos;
using Service.Interfaces;
using Service.Models;
using IResult = Service.Interfaces.IResult;

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
            //var result = await _projectService.GetAllProjectsIncludingAllPropertiesAsync();
            var result = await _projectService.GetAllAsync();
            return result;
        }
        
        [HttpGet("details")]
        public async Task<IResult<IEnumerable<ProjectWithDetails>>> GetWithDetails()
        {
            //var result = await _projectService.GetAllProjectsIncludingAllPropertiesAsync();
            var result = await _projectService.GetAllWithDetailsAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<IResult<Project>> Get(int id)
        {
            var result = await _projectService.GetByIdAsync(id);
            return result;
        }
        
        [HttpGet("details/{id}")]
        public async Task<IResult<ProjectWithDetails>> GetWithDetails(int id)
        {
            var result = await _projectService.GetByIdWithDetailsAsync(id);
            return result;
        }

        [HttpPost]
        public async Task<IResult> Post([FromBody] ProjectDto projectDto)
        {
            var result = await _projectService.CreateAsync(projectDto);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<IResult> Put(int id, [FromBody] ProjectDto projectDto)
        {
            var result = await _projectService.UpdateAsync(id, projectDto);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            var result = await _projectService.DeleteAsync(id);
            return result;
        }
    }
}
