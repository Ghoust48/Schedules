using Microsoft.EntityFrameworkCore.Migrations;

namespace ASP.NETCoreWebApplication.Data.Migrations
{
    public partial class AddedDaysWeektable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DaysWeekId",
                table: "Lessons",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "DaysWeeks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Day = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DaysWeeks", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_DaysWeekId",
                table: "Lessons",
                column: "DaysWeekId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lessons_DaysWeeks_DaysWeekId",
                table: "Lessons",
                column: "DaysWeekId",
                principalTable: "DaysWeeks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessons_DaysWeeks_DaysWeekId",
                table: "Lessons");

            migrationBuilder.DropTable(
                name: "DaysWeeks");

            migrationBuilder.DropIndex(
                name: "IX_Lessons_DaysWeekId",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "DaysWeekId",
                table: "Lessons");
        }
    }
}
