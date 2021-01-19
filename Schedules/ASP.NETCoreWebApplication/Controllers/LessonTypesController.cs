using System.Threading.Tasks;
using System.Linq;
using ASP.NETCoreWebApplication.Data;
using ASP.NETCoreWebApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonTypesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LessonTypesController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<ApiResult<LessonType>>> GetLessonTypes(int pageIndex = 0,
            int pageSize = 10,
            string sortColumn = null,
            string sortOrder = null,
            string filterColumn = null,
            string filterQuery = null)
        {
            return await ApiResult<LessonType>.CreateAsync(
                _context.LessonTypes,
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder,
                filterColumn,
                filterQuery);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<LessonType>> GetLessonType(int id)
        {
            var lessonType = await _context.LessonTypes.FindAsync(id);

            if (lessonType == null)
            {
                return NotFound();
            }

            return lessonType;
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLessonType(int id, LessonType lessonType)
        {
            if (id != lessonType.Id)
            {
                return BadRequest();
            }

            _context.Entry(lessonType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LessonTypeExists(id))
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
        
        [HttpPost]
        public async Task<ActionResult<LessonType>> PostLessonType(LessonType lessonType)
        {
            _context.LessonTypes.Add(lessonType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLessonType", new { id = lessonType.Id }, lessonType);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLessonType(int id)
        {
            var lessonType = await _context.LessonTypes.FindAsync(id);
            if (lessonType == null)
            {
                return NotFound();
            }

            _context.LessonTypes.Remove(lessonType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        private bool LessonTypeExists(int id)
        {
            return _context.LessonTypes.Any(e => e.Id == id);
        }
    }
}