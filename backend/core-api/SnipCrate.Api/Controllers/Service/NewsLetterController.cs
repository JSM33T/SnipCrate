using FrenCircle.Base.Controllers.Base;
using Microsoft.AspNetCore.Mvc;
using SnipCrate.Contracts;
using SnipCrate.Contracts.Shared;
using SnipCrate.Data;
using SnipCrate.Data.Entities;

namespace SnipCrate.Api.Controllers.Service
{
    [Route("api/newsletter")]
    public class NewsLetterController(AppDbContext context) : ScBaseController
    {
        private readonly AppDbContext _context = context;

        // POST: api/NewsLetter/add
        [HttpPost("add")]
        public async Task<ActionResult<ApiResponse<object>>> AddNewsletter([FromBody] SubscribeNewsLetterRequest subscribeNewsLetterRequest)
        {
            if (string.IsNullOrWhiteSpace(subscribeNewsLetterRequest.Email))
                return RESP_BadRequestResponse<object>("Email is required.");

            var exists = _context.Newsletters.Any(n => n.Email == subscribeNewsLetterRequest.Email);
            if (exists)
                return RESP_ConflictResponse<object>("Email already subscribed.");

            var newsletter = new Newsletter
            {
                Email = subscribeNewsLetterRequest.Email,
                DateAdded = DateTime.UtcNow,
                IsActive = true,
                Verified = false,
                RowGuid = Guid.NewGuid()
            };
            _context.Newsletters.Add(newsletter);
            await _context.SaveChangesAsync();
            // In real app, send verification email with newsletter.VerificationGuid
            return RESP_Success<object>("Newsletter subscription added. Please verify your email.");
        }

        // POST: api/NewsLetter/activate
        [HttpPost("activate")]
        public async Task<ActionResult<ApiResponse<object>>> VerifyNewsletter([FromQuery] Guid guid)
        {
            var newsletter = _context.Newsletters.FirstOrDefault(n => n.RowGuid == guid);
            if (newsletter == null)
                return RESP_NotFoundResponse<object>("Invalid verification link.");
            if (newsletter.Verified)
                return RESP_BadRequestResponse<object>("Already activated.");
            newsletter.Verified = true;
            await _context.SaveChangesAsync();
            return RESP_Success<object>((object)null!, "Newsletter verified successfully.");
        }

        // POST: api/NewsLetter/deactivate
        [HttpPost("deactivate")]
        public async Task<ActionResult<ApiResponse<object>>> DeactivateNewsletter([FromQuery] Guid guid)
        {
            var newsletter = _context.Newsletters.FirstOrDefault(n => n.RowGuid == guid);
            if (newsletter == null)
                return RESP_NotFoundResponse<object>("Invalid deactivation link.");
            if (!newsletter.IsActive)
                return RESP_BadRequestResponse<object>("Already deactivated.");
            newsletter.IsActive = false;
            await _context.SaveChangesAsync();
            return RESP_Success<object>((object)null!, "Newsletter deactivated.");
        }
    }
}
