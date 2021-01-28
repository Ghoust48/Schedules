using System.Linq;
using System.Threading.Tasks;
using ASP.NETCoreWebApplication.Data;
using ASP.NETCoreWebApplication.Models;
using ASP.NETCoreWebApplication.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SchedulesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResult<ScheduleDTO>>> GetSchedules(int pageIndex = 0,
            int pageSize = 10,
            string sortColumn = null,
            string sortOrder = null,
            string filterColumn = null,
            string filterQuery = null)
        {

            return await ApiResult<ScheduleDTO>.CreateAsync(
                _context.Schedules.Select(schedule => new ScheduleDTO
                {
                    Id = schedule.Id,
                    AuditoryId = schedule.Auditory.Id,
                    Auditory = schedule.Auditory.Name,
                    TimetableId = schedule.Timetable.Id,
                    FullTime = $"{schedule.Timetable.StartTime} - {schedule.Timetable.EndTime}",
                    StartTime = schedule.Timetable.StartTime,
                    EndTime = schedule.Timetable.EndTime,
                    WeeksTypeId = schedule.WeeksType.Id,
                    WeeksType = schedule.WeeksType.Type,
                    WeeksColor = schedule.WeeksType.Color,
                    DaysWeekId = schedule.DaysWeek.Id,
                    DaysWeek = schedule.DaysWeek.Day,
                    LessonTypeId = schedule.LessonType.Id,
                    LessonType = schedule.LessonType.Type,
                    LessonId = schedule.Lesson.Id,
                    Lesson = schedule.Lesson.Name
                }),
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder,
                filterColumn,
                filterQuery); }

        // GET: api/DaysWeeks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Schedule>> GetSchedule(int id)
        {
            var schedule = await _context.Schedules.FindAsync(id);

            if (schedule == null)
            {
                return NotFound();
            }

            return schedule;
        }

        // PUT: api/DaysWeeks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSchedule(int id, Schedule schedule)
        {
            if (id != schedule.Id)
            {
                return BadRequest();
            }

            _context.Entry(schedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(id))
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
        public async Task<ActionResult<Schedule>> PostSchedule(Schedule schedule)
        {
            _context.Schedules.Add(schedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSchedule", new { id = schedule.Id }, schedule);
        }

        // DELETE: api/DaysWeeks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSchedule(int id)
        {
            var schedule = await _context.Schedules.FindAsync(id);
            if (schedule == null)
            {
                return NotFound();
            }

            _context.Schedules.Remove(schedule);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ScheduleExists(int id)
        {
            return _context.Schedules.Any(e => e.Id == id);
        }
    }
}