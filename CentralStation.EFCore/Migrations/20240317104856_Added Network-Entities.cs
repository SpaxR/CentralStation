using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CentralStation.Migrations
{
    /// <inheritdoc />
    public partial class AddedNetworkEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "network");

            migrationBuilder.CreateTable(
                name: "networks",
                schema: "network",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<int>(type: "int", nullable: false),
                    Subnet = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_networks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "devices",
                schema: "network",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NetworkId = table.Column<int>(type: "int", nullable: false),
                    Address = table.Column<int>(type: "int", nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_devices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_devices_networks_NetworkId",
                        column: x => x.NetworkId,
                        principalSchema: "network",
                        principalTable: "networks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_devices_NetworkId",
                schema: "network",
                table: "devices",
                column: "NetworkId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "devices",
                schema: "network");

            migrationBuilder.DropTable(
                name: "networks",
                schema: "network");
        }
    }
}
