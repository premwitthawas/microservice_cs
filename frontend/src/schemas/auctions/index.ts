import { z } from "zod";

export const AuctionCreateSchema = z.object({
  make: z.string(),
  model: z.string(),
  color: z.string(),
  year: z.union([z.string(), z.number()]),
  mileage: z.union([z.string(), z.number()]),
  imageUrl: z.string(),
  auctionEnd: z.date(),
  reservePrice: z.union([z.string(), z.number()]),
});

export const AuctionUpdateSchema = z.object({
  make: z
    .string({ message: "Make should be a string" })
    .min(3, { message: "Make should have more than 3 characters" }),
  model: z
    .string({ message: "Model should be a string" })
    .min(3, { message: "Model should have more than 3 characters" }),
  color: z
    .string({ message: "Color should be a string" })
    .min(3, { message: "Color should have more than 3 characters" }),
  year: z.union([z.string(), z.number()]),
  mileage: z.union([z.string(), z.number()]),
});

export type TypeAuctionCreateSchema = z.infer<typeof AuctionCreateSchema>;
export type TypeAuctionUpdateSchema = z.infer<typeof AuctionUpdateSchema>;
