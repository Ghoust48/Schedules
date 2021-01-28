using Microsoft.EntityFrameworkCore.Migrations;

namespace ASP.NETCoreWebApplication.Data.Migrations
{
    public partial class Seedinginitialdata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Auditories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "211А" },
                    { 2, "212А" },
                    { 3, "213А" },
                    { 4, "214А" }
                });

            migrationBuilder.InsertData(
                table: "DaysWeeks",
                columns: new[] { "Id", "Day" },
                values: new object[,]
                {
                    { 1, "Понедельник" },
                    { 2, "Вторник" },
                    { 3, "Среда" },
                    { 4, "Четверг" },
                    { 5, "Пятница" },
                    { 6, "Суббота" }
                });

            migrationBuilder.InsertData(
                table: "LessonTypes",
                columns: new[] { "Id", "Type" },
                values: new object[,]
                {
                    { 2, "Практика" },
                    { 1, "Лекция" }
                });

            migrationBuilder.InsertData(
                table: "Timetables",
                columns: new[] { "Id", "EndTime", "StartTime" },
                values: new object[,]
                {
                    { 1, "10:20", "9:00" },
                    { 2, "11:50", "10:30" },
                    { 3, "13:40", "12:20" },
                    { 4, "15:10", "13:50" },
                    { 5, "16:50", "15:30" },
                    { 6, "18:20", "17:00" }
                });

            migrationBuilder.InsertData(
                table: "WeeksTypes",
                columns: new[] { "Id", "Color", "Type" },
                values: new object[,]
                {
                    { 1, "#35cc5d", "Зеленая" },
                    { 2, "#ffffff", "Белая" },
                    { 3, "#080808", "Все" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Auditories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Auditories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Auditories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Auditories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "DaysWeeks",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "DaysWeeks",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "DaysWeeks",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "DaysWeeks",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "DaysWeeks",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "DaysWeeks",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "LessonTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "LessonTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Timetables",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Timetables",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Timetables",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Timetables",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Timetables",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Timetables",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "WeeksTypes",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "WeeksTypes",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "WeeksTypes",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
