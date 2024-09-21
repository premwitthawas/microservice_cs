"use server";
import { fetchWrapper } from "@/lib/fetchWrapper";
import {
  TypeAuctionCreateSchema,
  TypeAuctionUpdateSchema,
} from "@/schemas/auctions";
import { PagedResult } from "@/types";
import { Auction } from "@/types/autions";
import { revalidatePath } from "next/cache";

export const fetchListAuctions = async (
  queryString: string
): Promise<PagedResult<Auction>> => {
  return await fetchWrapper.get(`/search${queryString}`);
};

export const updateAuctionTest = async () => {
  const data = {
    mileage: Math.floor(Math.random() * 10000) + 1,
    color: "red",
  };
  return await fetchWrapper.put(
    "/auctions/6a5011a1-fe1f-47df-9a32-b5346b289391",
    data
  );
};

export const createAction = async (data: TypeAuctionCreateSchema) => {
  return await fetchWrapper.post("/auctions", data);
};

export const fetchAcutionDetailsById = async (id: string): Promise<Auction> => {
  return await fetchWrapper.get(`/auctions/${id}`);
};

export const updateAuctionById = async (
  id: string,
  data: TypeAuctionUpdateSchema
) => {
  const res = await fetchWrapper.put(`/auctions/${id}`, data);
  revalidatePath(`/auctions/${id}`);
  return res;
};

export const deleteAuctionById = async (id: string) => {
  return await fetchWrapper.del(`/auctions/${id}`);
};
