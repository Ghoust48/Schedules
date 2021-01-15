using Microsoft.EntityFrameworkCore.Migrations;

namespace ASP.NETCoreWebApplication.Data.Migrations
{
    public partial class AddedWeeksTypetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Timetables_TimeTableId",
                table: "Lessons");

            migrationBuilder.RenameColumn(
                name: "TimeTableId",
                table: "Lessons",
                newName: "TimetableId");

            migrationBuilder.RenameIndex(
                name: "IX_Lessons_TimeTableId",
                table: "Lessons",
                newName: "IX_Lessons_TimetableId");

            migrationBuilder.AddColumn<int>(
                name: "WeeksTypeId",
                table: "Lessons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "WeeksTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeeksTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_WeeksTypeId",
                table: "Lessons",
                column: "WeeksTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Timetables_TimetableId",
                table: "Lessons",
                column: "TimetableId",
                principalTable: "Timetables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_WeeksTypes_WeeksTypeId",
                table: "Lessons",
                column: "WeeksTypeId",
                principalTable: "WeeksTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_Timetables_TimetableId",
                table: "Lessons");

            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_WeeksTypes_WeeksTypeId",
                table: "Lessons");

            migrationBuilder.DropTable(
                name: "WeeksTypes");

            migrationBuilder.DropIndex(
                name: "IX_Lessons_WeeksTypeId",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "WeeksTypeId",
                table: "Lessons");

            migrationBuilder.RenameColumn(
                name: "TimetableId",
                table: "Lessons",
                newName: "TimeTableId");

            migrationBuilder.RenameIndex(
                name: "IX_Lessons_TimetableId",
                table: "Lessons",
                newName: "IX_Lessons_TimeTableId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_Timetables_TimeTableId",
                table: "Lessons",
                column: "TimeTableId",
                principalTable: "Timetables",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
