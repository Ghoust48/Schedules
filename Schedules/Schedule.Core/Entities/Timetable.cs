using System;
using Schedule.Core.Entities.Base;

namespace Schedule.Core.Entities
{
    public class Timetable : BaseEntity
    {
        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public Lesson Lesson { get; set; }
    }
}