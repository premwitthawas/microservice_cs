using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuctionService.Data.Migrations
{
    /// <inheritdoc />
    public partial class Mapnewcolumnsname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_items_auctions_AuctionId",
                table: "items");

            migrationBuilder.RenameColumn(
                name: "Year",
                table: "items",
                newName: "year");

            migrationBuilder.RenameColumn(
                name: "Model",
                table: "items",
                newName: "model");

            migrationBuilder.RenameColumn(
                name: "Mileage",
                table: "items",
                newName: "mileage");

            migrationBuilder.RenameColumn(
                name: "Make",
                table: "items",
                newName: "make");

            migrationBuilder.RenameColumn(
                name: "Color",
                table: "items",
                newName: "color");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "items",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "items",
                newName: "image_url");

            migrationBuilder.RenameColumn(
                name: "AuctionId",
                table: "items",
                newName: "auction_id");

            migrationBuilder.RenameIndex(
                name: "IX_items_AuctionId",
                table: "items",
                newName: "IX_items_auction_id");

            migrationBuilder.RenameColumn(
                name: "Winner",
                table: "auctions",
                newName: "winner");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "auctions",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Seller",
                table: "auctions",
                newName: "seller");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "auctions",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UpdaatedAt",
                table: "auctions",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "SoldAmount",
                table: "auctions",
                newName: "sold_amount");

            migrationBuilder.RenameColumn(
                name: "ReservePrice",
                table: "auctions",
                newName: "reserve_price");

            migrationBuilder.RenameColumn(
                name: "CurrentHighBid",
                table: "auctions",
                newName: "current_high_bid");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "auctions",
                newName: "created_at");

            migrationBuilder.AddForeignKey(
                name: "FK_items_auctions_auction_id",
                table: "items",
                column: "auction_id",
                principalTable: "auctions",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_items_auctions_auction_id",
                table: "items");

            migrationBuilder.RenameColumn(
                name: "year",
                table: "items",
                newName: "Year");

            migrationBuilder.RenameColumn(
                name: "model",
                table: "items",
                newName: "Model");

            migrationBuilder.RenameColumn(
                name: "mileage",
                table: "items",
                newName: "Mileage");

            migrationBuilder.RenameColumn(
                name: "make",
                table: "items",
                newName: "Make");

            migrationBuilder.RenameColumn(
                name: "color",
                table: "items",
                newName: "Color");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "items",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "image_url",
                table: "items",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "auction_id",
                table: "items",
                newName: "AuctionId");

            migrationBuilder.RenameIndex(
                name: "IX_items_auction_id",
                table: "items",
                newName: "IX_items_AuctionId");

            migrationBuilder.RenameColumn(
                name: "winner",
                table: "auctions",
                newName: "Winner");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "auctions",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "seller",
                table: "auctions",
                newName: "Seller");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "auctions",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "auctions",
                newName: "UpdaatedAt");

            migrationBuilder.RenameColumn(
                name: "sold_amount",
                table: "auctions",
                newName: "SoldAmount");

            migrationBuilder.RenameColumn(
                name: "reserve_price",
                table: "auctions",
                newName: "ReservePrice");

            migrationBuilder.RenameColumn(
                name: "current_high_bid",
                table: "auctions",
                newName: "CurrentHighBid");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "auctions",
                newName: "CreatedAt");

            migrationBuilder.AddForeignKey(
                name: "FK_items_auctions_AuctionId",
                table: "items",
                column: "AuctionId",
                principalTable: "auctions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
