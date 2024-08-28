using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionService.Entities;

public enum Status {
    Live,
    Finished,
    ReserveNotMet,
};
