using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SnipCrate.Data.Migrations
{
    /// <inheritdoc />
    public partial class AppendNletterGuid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RowGuid",
                table: "Newsletters",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RowGuid",
                table: "Newsletters");
        }
    }
}
