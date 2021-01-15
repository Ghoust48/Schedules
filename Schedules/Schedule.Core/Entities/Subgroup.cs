using System.Collections.Generic;
using System.Text.Json.Serialization;
using Schedule.Core.Entities.Base;

namespace Schedule.Core.Entities
{
    public class Subgroup : BaseEntity
    {
        public int GroupId { get; set; }
        
        public Group Group { get; set; }
        
        //public int ScheduleLessonsId { get; set; }

        [JsonIgnore]
        public IEnumerable<Lesson> Lessons { get; set; }
    }
}