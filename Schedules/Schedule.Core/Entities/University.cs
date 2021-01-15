using System.Collections.Generic;
using System.Text.Json.Serialization;
using Schedule.Core.Entities.Base;

namespace Schedule.Core.Entities
{
    public class University : BaseEntity
    {
        public string Name { get; set; }

        [JsonIgnore]
        public IEnumerable<Faculty> Faculties { get; set; }
    }
}