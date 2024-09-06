import { Auction } from "@/types/autions";
import React from "react";
import CountdownTimer from "./CountdownTimer";
import CardImage from "./CardImage";

interface Props {
  auction: Auction;
}

const AuctionCard = ({ auction }: Props) => {
  return (
    <a href="#" className="group">
      <div className="w-full relative bg-gray-200 aspect-video rounded-lg overflow-hidden">
        <CardImage imageUrl={auction.imageUrl} make={auction.make} />
        <div className="absolute bottom-2 right-2" >
          <CountdownTimer auctionEnd={auction.auctionEnd} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="">{auction.make} {auction.model}</h3>
        <p className="font-semibold text-sm">{auction.year}</p>
      </div>
    </a>
  );
};

export default AuctionCard;
