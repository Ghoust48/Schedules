using Microsoft.EntityFrameworkCore;
using Schedule.Core.Entities;

namespace Schedule.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<University> Universities { get; set; }

        public DbSet<Faculty> Faculties { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<Subgroup> Subgroups { get; set; }

        public DbSet<ScheduleLessons> ScheduleLessons { get; set; }

        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<Auditory> Auditories { get; set; }
    }
}