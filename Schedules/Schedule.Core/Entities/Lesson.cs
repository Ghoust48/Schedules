using System.Collections.Generic;
using System.Text.Json.Serialization;
using Schedule.Core.Entities.Base;

namespace Schedule.Core.Entities
{
    public class Lesson : BaseEntity
    {
        public string Name { get; set; }

        public int WeeksTypeId { get; set; }

        public WeeksType WeeksType { get; set; }
        
        public int SubgroupId { get; set; }

        public Subgroup Subgroup { get; set; }
        
        [JsonIgnore]
        public IEnumerable<Auditory> Auditories { get; set; }
        
        [JsonIgnore]
        public IEnumerable<DaysWeek> DaysWeeks { get; set; }

        [JsonIgnore]
        public IEnumerable<Timetable> Timetables { get; set; }
    }
}