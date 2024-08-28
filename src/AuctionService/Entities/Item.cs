using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionService.Entities;

[Table("items")]
public class Item
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }
    [Column("make")]
    public string Make { get; set; }
    [Column("model")]
    public string Model { get; set; }
    [Column("year")]
    public int Year { get; set; }
    [Column("color")]
    public string Color { get; set; }
    [Column("mileage")]
    public int Mileage { get; set; }
    [Column("image_url")]
    public string ImageUrl { get; set; }
    // Navigate prop
    [Column("auction")]
    public Auction Auction { get; set; }
    [Column("auction_id")]
    public Guid AuctionId { get; set; }
};