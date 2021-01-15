using System.Collections.Generic;
using System.Text.Json.Serialization;
using Schedule.Core.Entities.Base;

namespace Schedule.Core.Entities
{
    public class Faculty : BaseEntity
    {
        public string Name { get; set; }

        public int UniversityId { get; set; }
        
        public University University { get; set; }

        [JsonIgnore]
        public virtual IEnumerable<Course> Courses { get; set; }
    }
}