using System.Collections.Generic;
using System.Text.Json.Serialization;
using Schedule.Core.Entities.Base;

namespace Schedule.Core.Entities
{
    public class Group : BaseEntity
    {
        public string Name { get; set; }
        
        public int CourseId { get; set; }

        public Course Course { get; set; }
        
        [JsonIgnore]
        public IEnumerable<Subgroup> Subgroups { get; set; }
    }
}