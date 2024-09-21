import { Auction } from "@/types/autions";
import React from "react";
import CountdownTimer from "./CountdownTimer";
import CardImage from "./CardImage";
import Link from "next/link";

interface Props {
  auction: Auction;
}

const AuctionCard = ({ auction }: Props) => {
  return (
    <Link href={`/auctions/details/${auction.id}`} className="group">
      <div className="w-full relative bg-gray-200 aspect-video rounded-lg overflow-hidden">
        <CardImage imageUrl={auction.imageUrl}  />
        <div className="absolute bottom-2 right-2" >
          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="">{auction.make} {auction.model}</h3>
        <p className="font-semibold text-sm">{auction.year}</p>
      </div>
    </Link>
  );
};

export default AuctionCard;
