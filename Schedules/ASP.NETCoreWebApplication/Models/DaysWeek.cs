using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models
{
    public class DaysWeek
    {
        public int Id { get; set; }

        public string Day { get; set; }

        public virtual IEnumerable<Lesson> Lessons { get; set; }
    }
}