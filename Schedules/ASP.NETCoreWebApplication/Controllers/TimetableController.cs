using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASP.NETCoreWebApplication.Data;
using ASP.NETCoreWebApplication.Models;
using ASP.NETCoreWebApplication.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ASP.NETCoreWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimetablesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TimetablesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Timetables
        [HttpGet]
        public async Task<ActionResult<ApiResult<Timetable>>> GetTimetables(int pageIndex = 0,
            int pageSize = 10,
            string sortColumn = null,
            string sortOrder = null,
            string filterColumn = null,
            string filterQuery = null)
        {
            return await ApiResult<Timetable>.CreateAsync(
                _context.Timetables/*.Select(timetable => new TimetableDTO()
                {
                    Id = timetable.Id,
                    StartTime = timetable.StartTime.ToString(),
                    EndTime = timetable.EndTime.ToString()
                })*/,
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder,
                filterColumn,
                filterQuery);
        }

        // GET: api/Timetables/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Timetable>> GetTimetable(int id)
        {
            var timetable = await _context.Timetables.FindAsync(id);

            if (timetable == null)
            {
                return NotFound();
            }

            return timetable;
        }

        // PUT: api/Timetables/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTimetable(int id, Timetable timetable)
        {
            /*var startTime = TimeSpan.Parse(timetableDto.StartTime);
            var endTime = TimeSpan.Parse(timetableDto.StartTime);
            
            var timetable = new Timetable()
            {
                Id = timetableDto.Id,
                StartTime = startTime,
                EndTime = endTime,
            };
            */
            
            if (id != timetable.Id)
            {
                return BadRequest();
            }

            _context.Entry(timetable).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TimetableExists(id))
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

        // POST: api/Timetables
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Timetable>> PostTimetable(Timetable timetable)
        {
            /*var startTime = TimeSpan.Parse(timetableDto.StartTime);
            var endTime = TimeSpan.Parse(timetableDto.StartTime);
            
            var timetable = new Timetable()
            {
                Id = timetableDto.Id,
                StartTime = startTime,
                EndTime = endTime,
            };*/
            
            _context.Timetables.Add(timetable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTimetable", new { id = timetable.Id }, timetable);
            
            /*_context.Timetables.Add(timetable);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTimetable", new { id = timetable.Id }, timetable);*/
        }

        // DELETE: api/Timetables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTimetable(int id)
        {
            var timetable = await _context.Timetables.FindAsync(id);
            if (timetable == null)
            {
                return NotFound();
            }

            _context.Timetables.Remove(timetable);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TimetableExists(int id)
        {
            return _context.Timetables.Any(e => e.Id == id);
        }
    }
}