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
    public class ScheduleLessonsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScheduleLessonsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ScheduleLessons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScheduleLessons>>> GetScheduleLessons()
        {
            return await _context.ScheduleLessons.ToListAsync();
        }

        // GET: api/ScheduleLessons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ScheduleLessons>> GetScheduleLessons(int id)
        {
            var scheduleLessons = await _context.ScheduleLessons.FindAsync(id);

            if (scheduleLessons == null)
            {
                return NotFound();
            }

            return scheduleLessons;
        }

        // PUT: api/ScheduleLessons/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutScheduleLessons(int id, ScheduleLessons scheduleLessons)
        {
            if (id != scheduleLessons.Id)
            {
                return BadRequest();
            }

            _context.Entry(scheduleLessons).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleLessonsExists(id))
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

        // POST: api/ScheduleLessons
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ScheduleLessons>> PostScheduleLessons(ScheduleLessons scheduleLessons)
        {
            _context.ScheduleLessons.Add(scheduleLessons);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetScheduleLessons", new { id = scheduleLessons.Id }, scheduleLessons);
        }

        // DELETE: api/ScheduleLessons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteScheduleLessons(int id)
        {
            var scheduleLessons = await _context.ScheduleLessons.FindAsync(id);
            if (scheduleLessons == null)
            {
                return NotFound();
            }

            _context.ScheduleLessons.Remove(scheduleLessons);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScheduleLessonsExists(int id)
        {
            return _context.ScheduleLessons.Any(e => e.Id == id);
        }
    }
}
