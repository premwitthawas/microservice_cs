using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionService.Entities;

[Table("auctions")]
public class Auction { 
    [Key]
    [Column("id")]
    public Guid Id { get; set; }
    [Column("reserve_price")]
    public int ReservePrice { get; set; } = 0;  
    [Column("seller")]
    public string Seller { get; set; }
    [Column("winner")] 
    public string Winner { get; set; } 
    [Column("sold_amount")]
    public int? SoldAmount { get; set; }
    [Column("current_high_bid")]
    public int? CurrentHighBid { get; set; }
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    [Column("auction_end")]
    public DateTime AuctionEnd { get; set; }
    [Column("updated_at")]
    public DateTime UpdaatedAt { get; set; } = DateTime.UtcNow;
    [Column("status")]
    public Status Status { get; set; }
    [Column("item")]
    public Item Item { get; set; }
};