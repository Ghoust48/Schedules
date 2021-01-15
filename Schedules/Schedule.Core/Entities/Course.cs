using System.Collections.Generic;
using System.Text.Json.Serialization;
using Schedule.Core.Entities.Base;

namespace Schedule.Core.Entities
{
    public class Course : BaseEntity
    {
        public int Number { get; set; }

        public int FacultyId { get; set; }

        public Faculty Faculty { get; set; }

        [JsonIgnore]
        public IEnumerable<Group> Groups { get; set; }
    }
}