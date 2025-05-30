// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionsController : ControllerBase
{
  private readonly AuctionDbContext _context;
  private readonly IMapper _mapper;
  private readonly IPublishEndpoint _publishEndpoint;

  public AuctionsController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publishEndpoint)
  {
    this._context = context;
    this._mapper = mapper;
    this._publishEndpoint = publishEndpoint;
  }

  [HttpGet]
  public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions(string date)
  {
    var query = this._context.Auctions.OrderBy(x => x.Item.Make).AsQueryable();
    if (!string.IsNullOrEmpty(date))
    {
      query = query.Where(x => x.UpdaatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
    }

    return await query.ProjectTo<AuctionDto>(this._mapper.ConfigurationProvider).ToListAsync();
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
  [Authorize]
  [HttpPost]
  public async Task<ActionResult<AuctionDto>> CreateAuction(CreateAuctionDto createAuctionDto)
  {
    // createdto -> auction
    var auction = this._mapper.Map<Auction>(createAuctionDto);
    // TODO: User Seller
    auction.Seller = User.Identity.Name;

    this._context.Auctions.Add(auction);
    var newAuction = this._mapper.Map<AuctionDto>(auction);
    await this._publishEndpoint.Publish(this._mapper.Map<AuctionCreated>(newAuction));

    var state = await this._context.SaveChangesAsync() > 0;

    if (!state) return BadRequest("Could not save changes to the DB");
    // auction -> auctionDto
    var res = CreatedAtAction(nameof(GetAuctionById), new { auction.Id }, newAuction);
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

    if (auction.Seller != User.Identity.Name) return Forbid();

    auction.Item.Make = updateAuctionDto.Make ?? auction.Item.Make;
    auction.Item.Model = updateAuctionDto.Model ?? auction.Item.Model;
    auction.Item.Color = updateAuctionDto.Color ?? auction.Item.Color;
    auction.Item.Mileage = updateAuctionDto.Mileage ?? auction.Item.Mileage;
    auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;

    await _publishEndpoint.Publish(_mapper.Map<AuctionUpdated>(auction));

    var result = await this._context.SaveChangesAsync() > 0;

    if (result) return Ok();

    return BadRequest("Can't Updateing DB");

  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteAuction(Guid id)
  {
    var auction = await this._context.Auctions.FindAsync(id);
    if (auction == null) return NotFound();
    // TODO: check seller == username
    if (auction.Seller != User.Identity.Name) return Forbid();
    this._context.Auctions.Remove(auction);
    await this._publishEndpoint.Publish<AuctionDeleted>(new { Id = auction.Id.ToString() });
    var result = await this._context.SaveChangesAsync() > 0;
    if (!result) return BadRequest("Could not update DB");
    return Ok();
  }

};
