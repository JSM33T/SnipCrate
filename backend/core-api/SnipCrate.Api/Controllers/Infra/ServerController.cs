using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

namespace SnipCrate.Api.Controllers.Infra
{
    [ApiController]
    [Route("/api/server")]
    public class ServerController(ILogger<ServerController> logger) : ControllerBase
    {
        private readonly ILogger<ServerController> _logger = logger;

        [HttpGet(Name = "ServerState")]
        public IActionResult Get()
        {
            var systemDetails = new
            {
                RuntimeInformation.OSDescription,
                OSArchitecture = RuntimeInformation.OSArchitecture.ToString(),
                ProcessArchitecture = RuntimeInformation.ProcessArchitecture.ToString(),
                Framework = RuntimeInformation.FrameworkDescription,
                Environment.MachineName,
                Status = "Up and running | #2"
            };

            return Ok(systemDetails);
        }
    }
}
