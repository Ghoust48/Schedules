using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ASP.NETCoreWebApplication.Data.Migrations
{
    public partial class AddedTimetablestable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TimeTableId",
                table: "Lessons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Timetables",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timetables", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_TimeTableId",
                table: "Lessons",
                column: "TimeTableId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Timetables_TimeTableId",
                table: "Lessons",
                column: "TimeTableId",
                principalTable: "Timetables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Timetables_TimeTableId",
                table: "Lessons");

            migrationBuilder.DropTable(
                name: "Timetables");

            migrationBuilder.DropIndex(
                name: "IX_Lessons_TimeTableId",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "TimeTableId",
                table: "Lessons");
        }
    }
}
