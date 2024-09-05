export type Auction = {
  id: string;
  reservePrice: number;
  seller: string;
  winner: string | null;
  soldAmount: number;
  currentHighBid: number;
  createdAt: string;
  auctionEnd: string;
  updaatedAt: string;
  status: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  imageUrl: string;
};
