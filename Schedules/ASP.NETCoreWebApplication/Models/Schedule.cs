using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models
{
    public class Schedule
    {
        public int Id { get; set; }

        public int AuditoryId { get; set; }

        public virtual Auditory Auditory { get; set; }

        public int TimetableId { get; set; }

        public virtual Timetable Timetable { get; set; }

        public int WeeksTypeId { get; set; }
        
        public virtual WeeksType WeeksType { get; set; }
        
        public int DaysWeekId { get; set; }

        public DaysWeek DaysWeek { get; set; }

        public int LessonTypeId { get; set; }

        public LessonType LessonType { get; set; }

        public int LessonId { get; set; }

        public Lesson Lesson { get; set; }
    }
}