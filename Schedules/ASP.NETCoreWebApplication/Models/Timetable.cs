using System;
using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models
{
    public class Timetable
    {
        public int Id { get; set; }
        
        public string StartTime { get; set; }

        public string EndTime { get; set; }
        
        public virtual IEnumerable<Lesson> Lessons { get; set; }
    }
}