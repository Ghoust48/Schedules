using System;
using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models
{
    public class Timetable
    {
        public int Id { get; set; }
        
        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }
        
        public virtual IEnumerable<Lesson> Lessons { get; set; }
    }
}