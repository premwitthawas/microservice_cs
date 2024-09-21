"use client";
import { Auction } from "@/types/autions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  auction: Auction;
}

const AuctionDetail = ({ auction }: Props) => {
  return (
    <Table className="rounded-md shadow-md">
      <TableHeader className="bg-slate-200">
        <TableRow>
          <TableHead>Seller</TableHead>
          <TableHead>Make</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Year Manfactured</TableHead>
          <TableHead>Mileage</TableHead>
          <TableHead>Reserve Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-slate-100 hover:bg-white">
        <TableRow>
          <TableCell className="font-medium">{auction.seller}</TableCell>
          <TableCell className="font-medium">{auction.make}</TableCell>
          <TableCell className="font-medium">{auction.model}</TableCell>
          <TableCell className="font-medium">{auction.year}</TableCell>
          <TableCell className="font-medium">{auction.mileage}</TableCell>
          <TableCell className="font-medium">{auction.reservePrice}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AuctionDetail;
