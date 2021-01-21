using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models
{
    public class Schedule
    {
        public int Id { get; set; }

        public DaysWeek DaysWeek { get; set; }

        public Timetable Timetable { get; set; }

        public IEnumerable<Lesson> Lessons { get; set; }
    }
}