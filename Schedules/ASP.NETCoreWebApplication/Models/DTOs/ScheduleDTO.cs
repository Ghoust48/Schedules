using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models.DTOs
{
    public class ScheduleDTO
    {
        public int Id { get; set; }

        public int AuditoryId { get; set; }

        public string Auditory { get; set; }
        
        public int TimetableId { get; set; }

        public string FullTime { get; set; }
        
        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public int WeeksTypeId { get; set; }

        public string WeeksType { get; set; }

        public string WeeksColor { get; set; }
        
        public int DaysWeekId { get; set; }

        public string DaysWeek { get; set; }

        public int LessonTypeId { get; set; }

        public string LessonType { get; set; }

        public int LessonId { get; set; }

        public string Lesson { get; set; }
    }
}