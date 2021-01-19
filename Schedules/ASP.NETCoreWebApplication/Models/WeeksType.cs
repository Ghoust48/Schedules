using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models
{
    public class WeeksType
    {
        public int Id { get; set; }

        public string Type { get; set; }

        public string Color { get; set; }

        public virtual IEnumerable<Lesson> Lessons { get; set; }
    }
}