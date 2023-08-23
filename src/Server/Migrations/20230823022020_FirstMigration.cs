﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    PostID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "TEXT", maxLength: 100000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.PostID);
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostID", "Content", "Title" },
                values: new object[,]
                {
                    { 1, "This is post #1 and it has some very interesting content.", "Post 1" },
                    { 2, "This is post #2 and it has some very interesting content.", "Post 2" },
                    { 3, "This is post #3 and it has some very interesting content.", "Post 3" },
                    { 4, "This is post #4 and it has some very interesting content.", "Post 4" },
                    { 5, "This is post #5 and it has some very interesting content.", "Post 5" },
                    { 6, "This is post #6 and it has some very interesting content.", "Post 6" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Posts");
        }
    }
}
