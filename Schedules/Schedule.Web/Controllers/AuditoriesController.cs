using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Schedule.Core.Entities;
using Schedule.Web.Data;

namespace Schedule.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuditoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Auditories
        [HttpGet]
        public async Task<ActionResult<ApiResult<Auditory>>> GetAuditories(int pageIndex = 0,
            int pageSize = 10,
            string sortColumn = null,
            string sortOrder = null,
            string filterColumn = null,
            string filterQuery = null)
        {
            return await ApiResult<Auditory>.CreateAsync(
                _context.Auditories,
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder,
                filterColumn,
                filterQuery);
        }

        // GET: api/Auditories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Auditory>> GetAuditory(int id)
        {
            var auditory = await _context.Auditories.FindAsync(id);

            if (auditory == null)
            {
                return NotFound();
            }

            return auditory;
        }

        // PUT: api/Auditories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuditory(int id, Auditory auditory)
        {
            if (id != auditory.Id)
            {
                return BadRequest();
            }

            _context.Entry(auditory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuditoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Auditories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Auditory>> PostAuditory(Auditory auditory)
        {
            _context.Auditories.Add(auditory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuditory", new { id = auditory.Id }, auditory);
        }

        // DELETE: api/Auditories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuditory(int id)
        {
            var auditory = await _context.Auditories.FindAsync(id);
            if (auditory == null)
            {
                return NotFound();
            }

            _context.Auditories.Remove(auditory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AuditoryExists(int id)
        {
            return _context.Auditories.Any(e => e.Id == id);
        }
    }
}
