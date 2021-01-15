namespace ASP.NETCoreWebApplication.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        
        public string Name { get; set; }

        public int AuditoryId { get; set; }

        public virtual Auditory Auditory { get; set; }

        public int TimetableId { get; set; }

        public virtual Timetable Timetable { get; set; }

        public int WeeksTypeId { get; set; }
        
        public virtual WeeksType WeeksType { get; set; }
    }
}