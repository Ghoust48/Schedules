using System.Collections.Generic;
using ASP.NETCoreWebApplication.Controllers;
using ASP.NETCoreWebApplication.Data;
using ASP.NETCoreWebApplication.Models;
using Moq;
using Xunit;

namespace Schedule.Tests
{
   
    public class LessonsControllerTests
    {
        [Fact]
        public void ActionResultNotNull()
        {
            /*var mock = new Mock<ApplicationDbContext>();
            mock.Setup(context => context.Lessons).Returns(GetTestLessons());
            LessonsController controller = new LessonsController(mock.Object);*/
        }
        
        private List<Lesson> GetTestLessons()
        {
            var lessons = new List<Lesson>
            {
                new Lesson {Id = 1, Name = "asd"},
                new Lesson {Id = 2, Name = "asd"},
            };
            
            return lessons;
        }
    }
}