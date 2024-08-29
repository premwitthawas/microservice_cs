// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController : ControllerBase
{
  private readonly AuctionDbContext _context;
  private readonly IMapper _mapper;

  public AuctionsController(AuctionDbContext context, IMapper mapper)
  {
    this._context = context;
    this._mapper = mapper;
  }

  [HttpGet]
  public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
  {
    var auctions = await this._context.Auctions
    .Include(x => x.Item)
    .OrderBy(x => x.Item.Make)
    .ToListAsync();
    var res = this._mapper.Map<List<AuctionDto>>(auctions);
    return res;
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<AuctionDto>> GetAuctionById(Guid id)
  {
    var auction = await this._context.Auctions
    .Include(x => x.Item)
    .FirstOrDefaultAsync(x => x.Id == id);
    if (auction == null)
    {
      return NotFound();
    }
    var res = this._mapper.Map<AuctionDto>(auction);
    return res;
  }

  [HttpPost]
  public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuctionDto)
  {
    // createdto -> auction
    var auction = this._mapper.Map<Auction>(createAuctionDto);
    // TODO: User Seller
    auction.Seller = "Test User";
    this._context.Auctions.Add(auction);
    var state = await this._context.SaveChangesAsync() > 0;
    if (!state) return BadRequest("Could not save changes to the DB");
    // auction -> auctionDto
    var res = CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, _mapper.Map<AuctionDto>(auction));
    return res;
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDto updateAuctionDto)
  {
    var auction = await this._context.Auctions
    .Include(x => x.Item)
    .FirstOrDefaultAsync(x => x.Id == id);

    if (auction == null) return NotFound();

    // TODO: check seller == username

    auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
    auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
    auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
    auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
    auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;

    var result = await this._context.SaveChangesAsync() > 0;

    if(result) return Ok();

    return BadRequest("Can't Updateing DB");

  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteAuction(Guid id)
  {
    var auction = await this._context.Auctions.FindAsync(id);
    if(auction == null) return NotFound();
    // TODO: check seller == username
    this._context.Auctions.Remove(auction);
    var result = await this._context.SaveChangesAsync() > 0;
    if(!result) return BadRequest("Could not update DB");
    return Ok();
  }

};
