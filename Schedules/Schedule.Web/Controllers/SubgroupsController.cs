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
    public class SubgroupsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubgroupsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Subgroups
        [HttpGet]
        public async Task<ActionResult<ApiResult<Subgroup>>> GetSubgroups(int pageIndex = 0,
            int pageSize = 10,
            string sortColumn = null,
            string sortOrder = null,
            string filterColumn = null,
            string filterQuery = null)
        {
            return await ApiResult<Subgroup>.CreateAsync(
                _context.Subgroups,
                pageIndex,
                pageSize,
                sortColumn,
                sortOrder,
                filterColumn,
                filterQuery);
        }

        // GET: api/Subgroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subgroup>> GetSubgroup(int id)
        {
            var subgroup = await _context.Subgroups.FindAsync(id);

            if (subgroup == null)
            {
                return NotFound();
            }

            return subgroup;
        }

        // PUT: api/Subgroups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubgroup(int id, Subgroup subgroup)
        {
            if (id != subgroup.Id)
            {
                return BadRequest();
            }

            _context.Entry(subgroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubgroupExists(id))
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

        // POST: api/Subgroups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Subgroup>> PostSubgroup(Subgroup subgroup)
        {
            _context.Subgroups.Add(subgroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubgroup", new { id = subgroup.Id }, subgroup);
        }

        // DELETE: api/Subgroups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubgroup(int id)
        {
            var subgroup = await _context.Subgroups.FindAsync(id);
            if (subgroup == null)
            {
                return NotFound();
            }

            _context.Subgroups.Remove(subgroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubgroupExists(int id)
        {
            return _context.Subgroups.Any(e => e.Id == id);
        }
    }
}
