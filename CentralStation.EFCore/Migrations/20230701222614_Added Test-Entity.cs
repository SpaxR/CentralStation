using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CentralStation.EFCore.Migrations
{
    /// <inheritdoc />
    public partial class AddedTestEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "central_station");

            migrationBuilder.CreateTable(
                name: "TestEntities",
                schema: "central_station",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ArbitraryString = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestEntities", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestEntities",
                schema: "central_station");
        }
    }
}
