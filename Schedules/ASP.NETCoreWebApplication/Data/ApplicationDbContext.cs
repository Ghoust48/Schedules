using ASP.NETCoreWebApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace ASP.NETCoreWebApplication.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            //modelBuilder.Entity<ScheduleLessons>()
        }

        /*public DbSet<University> Universities { get; set; }

        public DbSet<Faculty> Faculties { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<Subgroup> Subgroups { get; set; }

        public DbSet<ScheduleLessons> ScheduleLessons { get; set; }*/

        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<DaysWeek> DaysWeeks { get; set; }

        public DbSet<Timetable> Timetables { get; set; }

        public DbSet<WeeksType> WeeksTypes { get; set; }

        public DbSet<Auditory> Auditories { get; set; }
    }
}