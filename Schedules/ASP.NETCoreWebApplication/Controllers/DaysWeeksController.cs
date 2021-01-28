using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using ASP.NETCoreWebApplication.Data;
using ASP.NETCoreWebApplication.Models;
using ASP.NETCoreWebApplication.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaysWeeksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DaysWeeksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DaysWeeks
        [HttpGet]
        public async Task<ActionResult<ApiResult<DaysWeek>>> GetDaysWeeks(int pageIndex = 0,
            int pageSize = 10,
            string sortColumn = null,
            string sortOrder = null,
            string filterColumn = null,
            string filterQuery = null)
        {
            return await ApiResult<DaysWeek>.CreateAsync(
                _context.DaysWeeks,
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder,
                filterColumn,
                filterQuery);
            
            /*return await ApiResult<DaysWeekDTO>.CreateAsync(
                _context.DaysWeeks.Select(week => new DaysWeekDTO
                {
                    Id = week.Id,
                    Day = week.Day,
                    Lessons = week.Lessons.Select(lesson => new LessonDTO
                    {
                        Id = lesson.Id,
                        Name = lesson.Name,
                        AuditoryId = lesson.Auditory.Id,
                        Auditory = lesson.Auditory.Name,
                        TimetableId = lesson.Timetable.Id,
                        StartTime = lesson.Timetable.StartTime,
                        EndTime = lesson.Timetable.EndTime,
                        WeeksTypeId = lesson.WeeksType.Id,
                        WeeksType = lesson.WeeksType.Type,
                        WeeksColor = lesson.WeeksType.Color,
                        DaysWeekId = lesson.DaysWeek.Id,
                        DaysWeek = lesson.DaysWeek.Day,
                        LessonTypeId = lesson.LessonType.Id,
                        LessonType = lesson.LessonType.Type
                    })
                }),
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder,
                filterColumn,
                filterQuery);*/
        }

        // GET: api/DaysWeeks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DaysWeek>> GetDaysWeek(int id)
        {
            var daysWeek = await _context.DaysWeeks.FindAsync(id);

            if (daysWeek == null)
            {
                return NotFound();
            }

            return daysWeek;
        }

        // PUT: api/DaysWeeks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDaysWeek(int id, DaysWeek daysWeek)
        {
            if (id != daysWeek.Id)
            {
                return BadRequest();
            }

            _context.Entry(daysWeek).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DaysWeekExists(id))
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

        // POST: api/DaysWeeks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DaysWeek>> PostDaysWeek(DaysWeek daysWeek)
        {
            _context.DaysWeeks.Add(daysWeek);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDaysWeek", new { id = daysWeek.Id }, daysWeek);
        }

        // DELETE: api/DaysWeeks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDaysWeek(int id)
        {
            var daysWeek = await _context.DaysWeeks.FindAsync(id);
            if (daysWeek == null)
            {
                return NotFound();
            }

            _context.DaysWeeks.Remove(daysWeek);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DaysWeekExists(int id)
        {
            return _context.DaysWeeks.Any(e => e.Id == id);
        }
    }
}