using System;

namespace ASP.NETCoreWebApplication.Models.DTOs
{
    public class LessonDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int AuditoryId { get; set; }

        public string Auditory { get; set; }
        
        public int TimetableId { get; set; }
        
        public string StartTime { get; set; }

        public string EndTime { get; set; }
    }
}