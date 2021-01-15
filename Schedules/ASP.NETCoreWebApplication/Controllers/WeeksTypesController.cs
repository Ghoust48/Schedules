using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASP.NETCoreWebApplication.Data;
using ASP.NETCoreWebApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeeksTypesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WeeksTypesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/WeeksTypes
        [HttpGet]
        public async Task<ActionResult<ApiResult<WeeksType>>> GetWeeksTypes(int pageIndex = 0,
            int pageSize = 10,
            string sortColumn = null,
            string sortOrder = null,
            string filterColumn = null,
            string filterQuery = null)
        {
            return await ApiResult<WeeksType>.CreateAsync(
                _context.WeeksTypes,
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder,
                filterColumn,
                filterQuery);
        }

        // GET: api/WeeksTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WeeksType>> GetWeeksType(int id)
        {
            var weeksType = await _context.WeeksTypes.FindAsync(id);

            if (weeksType == null)
            {
                return NotFound();
            }

            return weeksType;
        }

        // PUT: api/WeeksTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWeeksType(int id, WeeksType weeksType)
        {
            if (id != weeksType.Id)
            {
                return BadRequest();
            }

            _context.Entry(weeksType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeeksTypeExists(id))
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

        // POST: api/WeeksTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WeeksType>> PostWeeksType(WeeksType weeksType)
        {
            _context.WeeksTypes.Add(weeksType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWeeksType", new { id = weeksType.Id }, weeksType);
        }

        // DELETE: api/WeeksTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeeksType(int id)
        {
            var weeksType = await _context.WeeksTypes.FindAsync(id);
            if (weeksType == null)
            {
                return NotFound();
            }

            _context.WeeksTypes.Remove(weeksType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WeeksTypeExists(int id)
        {
            return _context.WeeksTypes.Any(e => e.Id == id);
        }
    }
}