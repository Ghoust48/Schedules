using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models.DTOs
{
    public class ScheduleDTO
    {
        public int Id { get; set; }

        public string DaysWeek { get; set; }

        public string StartTime { get; set; }
        
        public string EndTime { get; set; }

        public IEnumerable<LessonDTO> Lessons { get; set; }
    }
}