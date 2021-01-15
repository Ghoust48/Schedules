using System.Collections.Generic;
using System.Text.Json.Serialization;
using Schedule.Core.Entities.Base;

namespace Schedule.Core.Entities
{
    public class ScheduleLessons : BaseEntity
    {
        public int SubgroupId { get; set; }
        
        public Subgroup Subgroup { get; set; }
        
        
    }
}