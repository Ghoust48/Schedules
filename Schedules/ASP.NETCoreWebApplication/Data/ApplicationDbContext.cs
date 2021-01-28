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

            modelBuilder.Entity<Auditory>().HasData(
                new Auditory {Id = 1, Name = "211А"},
                new Auditory {Id = 2, Name = "212А"},
                new Auditory {Id = 3, Name = "213А"},
                new Auditory {Id = 4, Name = "214А"}
            );

            modelBuilder.Entity<DaysWeek>().HasData(
                new DaysWeek {Id = 1, Day = "Понедельник"},
                new DaysWeek {Id = 2, Day = "Вторник"},
                new DaysWeek {Id = 3, Day = "Среда"},
                new DaysWeek {Id = 4, Day = "Четверг"},
                new DaysWeek {Id = 5, Day = "Пятница"},
                new DaysWeek {Id = 6, Day = "Суббота"}
            );

            modelBuilder.Entity<WeeksType>().HasData(
                new WeeksType {Id = 1, Type = "Зеленая", Color = "#35cc5d"},
                new WeeksType {Id = 2, Type = "Белая", Color = "#ffffff"},
                new WeeksType {Id = 3, Type = "Все", Color = "#080808"}
            );

            modelBuilder.Entity<Timetable>().HasData(
                new Timetable {Id = 1, StartTime = "9:00", EndTime = "10:20"},
                new Timetable {Id = 2, StartTime = "10:30", EndTime = "11:50"},
                new Timetable {Id = 3, StartTime = "12:20", EndTime = "13:40"},
                new Timetable {Id = 4, StartTime = "13:50", EndTime = "15:10"},
                new Timetable {Id = 5, StartTime = "15:30", EndTime = "16:50"},
                new Timetable {Id = 6, StartTime = "17:00", EndTime = "18:20"}
            );

            modelBuilder.Entity<LessonType>().HasData(
                new LessonType {Id = 1, Type = "Лекция"},
                new LessonType {Id = 2, Type = "Практика"}
            );
        }

        /*public DbSet<University> Universities { get; set; }

        public DbSet<Faculty> Faculties { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Group> Groups { get; set; }

        public DbSet<Subgroup> Subgroups { get; set; }

        public DbSet<ScheduleLessons> ScheduleLessons { get; set; }*/

        public DbSet<Schedule> Schedules { get; set; }

        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<DaysWeek> DaysWeeks { get; set; }

        public DbSet<Timetable> Timetables { get; set; }

        public DbSet<WeeksType> WeeksTypes { get; set; }

        public DbSet<Auditory> Auditories { get; set; }

        public DbSet<LessonType> LessonTypes { get; set; }
    }
}