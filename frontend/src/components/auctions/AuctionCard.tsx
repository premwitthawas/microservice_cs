"use client";
import { Auction } from "@/types/autions";
import React from "react";

interface Props {
  auction: Auction;
}

const AuctionCard = ({ auction }: Props) => {
  return <div>{auction.make}</div>;
};

export default AuctionCard;
