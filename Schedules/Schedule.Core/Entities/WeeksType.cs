using Schedule.Core.Entities.Base;

namespace Schedule.Core.Entities
{
    public class WeeksType : BaseEntity
    {
        public string Color { get; set; }

        public Lesson Lesson { get; set; }
    }
}