using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models.DTOs
{
    public class DaysWeekDTO
    {
        public int Id { get; set; }

        public string Day { get; set; }

        public IEnumerable<LessonDTO> Lessons { get; set; }
    }
}