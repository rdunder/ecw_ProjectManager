using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Main.Controllers
{
    [Route("api")]
    [ApiController]
    public class IndexController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            string s = @"Welcome to Project manager API, you can find this project at: https://github.com/rdunder/ecw_ProjectManager";
            return s;
        }
    }
}
