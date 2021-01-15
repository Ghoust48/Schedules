using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Schedule.Core.Entities;
using Schedule.Web.Data;

namespace Schedule.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SeedController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task Import()
        {
            await SeedLessons();
            await SeedAuditories();
            /*await SeedScheduleLessons();
            await SeedSubgroups();*/
            await SeedGroups();
            await SeedCourse();
            await SeedFaculty();
            await SeedUniversity();
        }

        private async Task SeedLessons()
        {
            var lessons = new List<Lesson>()
            {
                new Lesson()
                {
                    Name = "Базы данных"
                },
                new Lesson()
                {
                    Name = "Программирование на платформе .NET"
                }
            };
            
            _context.Lessons.AddRange(lessons);
            await _context.SaveChangesAsync();
        }
        
        private async Task SeedAuditories()
        {
            var auditories = new List<Auditory>()
            {
                new Auditory()
                {
                    Name = "217Д"
                },
                new Auditory()
                {
                    Name = "211А"
                },
                new Auditory()
                {
                    Name = "207Г"
                }
            };
            
            _context.Auditories.AddRange(auditories);
            await _context.SaveChangesAsync();
        }
        
        /*private async Task SeedScheduleLessons()
        {
            var scheduleLessons = new ScheduleLessons()
            {
                Auditories = await _context.Auditories.ToListAsync(),
                Lessons = await _context.Lessons.ToListAsync()
            };
            
            _context.ScheduleLessons.AddRange(scheduleLessons);
            await _context.SaveChangesAsync();
        }
        
        private async Task SeedSubgroups()
        {
            var supgroups = new List<Subgroup>()
            {
                new Subgroup()
                {
                    ScheduleLessons = await _context.ScheduleLessons.FirstOrDefaultAsync()
                }
            };
            
            _context.Subgroups.AddRange(supgroups);
            await _context.SaveChangesAsync();
        }*/
        
        private async Task SeedGroups()
        {
            var groups = new List<Group>()
            {
                new Group()
                {
                    Name = "ИТ-1",
                    Subgroups = await _context.Subgroups.ToListAsync()
                }
            };
            
            _context.Groups.AddRange(groups);
            await _context.SaveChangesAsync();
        }
        
        private async Task SeedCourse()
        {
            var courses = new List<Course>()
            {
                new Course()
                {
                    Number = 1,
                    Groups = await _context.Groups.ToListAsync()
                }
            };
            
            _context.Courses.AddRange(courses);
            await _context.SaveChangesAsync();
        }
        
        private async Task SeedFaculty()
        {
            var faculties = new List<Faculty>()
            {
                new Faculty()
                {
                    Name = "Факультет информационных технологий",
                    Courses = await _context.Courses.ToListAsync()
                }
            };
            
            _context.Faculties.AddRange(faculties);
            await _context.SaveChangesAsync();
        }
        
        private async Task SeedUniversity()
        {
            var university = new University()
            {
                Name = "PSU",
                Faculties = await _context.Faculties.ToListAsync()
            };
            
            _context.Universities.AddRange(university);
            await _context.SaveChangesAsync();
        }
    }
}
