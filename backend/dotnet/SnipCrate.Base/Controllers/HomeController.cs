using Microsoft.AspNetCore.Mvc;

namespace SnippetCrate.Base.Controllers
{
    [ApiController]
    [Route("/api/home")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "Home")]
        public async Task<IActionResult> Home()
        {
            _logger.LogInformation("Fetching weather forecast");
            return Ok(new
            {
                Message = "Welcome to SnippetCrate API",
                Version = "1.0.0",
                Status = "Running"
            });
        }
    }
}
