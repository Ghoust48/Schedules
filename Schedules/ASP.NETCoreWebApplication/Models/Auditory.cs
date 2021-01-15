using System.Collections.Generic;

namespace ASP.NETCoreWebApplication.Models
{
    public class Auditory
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public virtual IEnumerable<Lesson> Lessons { get; set; }
    }
}