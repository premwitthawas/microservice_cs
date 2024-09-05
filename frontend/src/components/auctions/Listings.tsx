import { Auction } from "@/types/autions";
import AuctionCard from "./AuctionCard";
import axios from "axios";

const Listings = async () => {
  const fetchListAuctions = async () => {
    const res = await axios.get("http://localhost:6001/search");
    if (res.status !== 200) throw new Error("Fail");
    return res.data.results;
  };
  const data: Auction[] = await fetchListAuctions();
  return (
    <div>
      {data &&
        data.map((auction) => {
          return <AuctionCard key={auction.id} auction={auction} />;
        })}
    </div>
  );
};

export default Listings;
