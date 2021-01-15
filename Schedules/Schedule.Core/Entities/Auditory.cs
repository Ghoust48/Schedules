using Schedule.Core.Entities.Base;

namespace Schedule.Core.Entities
{
    public class Auditory : BaseEntity
    {
        public string Name { get; set; }

        public int LessonId { get; set; }

        public Lesson Lesson { get; set; }
    }
}