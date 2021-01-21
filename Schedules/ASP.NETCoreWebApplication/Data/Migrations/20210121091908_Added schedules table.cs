using Microsoft.EntityFrameworkCore.Migrations;

namespace ASP.NETCoreWebApplication.Data.Migrations
{
    public partial class Addedschedulestable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ScheduleId",
                table: "Lessons",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DaysWeekId = table.Column<int>(type: "int", nullable: true),
                    TimetableId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schedules_DaysWeeks_DaysWeekId",
                        column: x => x.DaysWeekId,
                        principalTable: "DaysWeeks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Schedules_Timetables_TimetableId",
                        column: x => x.TimetableId,
                        principalTable: "Timetables",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_ScheduleId",
                table: "Lessons",
                column: "ScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_DaysWeekId",
                table: "Schedules",
                column: "DaysWeekId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_TimetableId",
                table: "Schedules",
                column: "TimetableId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Schedules_ScheduleId",
                table: "Lessons",
                column: "ScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Schedules_ScheduleId",
                table: "Lessons");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropIndex(
                name: "IX_Lessons_ScheduleId",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "ScheduleId",
                table: "Lessons");
        }
    }
}
