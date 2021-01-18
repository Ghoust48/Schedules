using System;
using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models
{
    public class Timetable
    {
        public int Id { get; set; }

        /*public string StartTime
        {
            get => StartTime;
            set => TimeSpan.Parse(EndTime) - TimeSpan.Parse(StartTime) > 0
                ? StartTime = value
                : throw new ArgumentException("Start time can't be more end time!", nameof(StartTime));
        }*/
        
        public string StartTime { get; set; }

        public string EndTime { get; set; }
        
        public virtual IEnumerable<Lesson> Lessons { get; set; }
    }
}