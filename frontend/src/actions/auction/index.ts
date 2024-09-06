"use server";
import { PagedResult } from "@/types";
import { Auction } from "@/types/autions";
import axios from "axios";

export const fetchListAuctions = async (
  queryString: string
): Promise<PagedResult<Auction>> => {
  const res = await axios.get<PagedResult<Auction>>(
    `http://localhost:6001/search${queryString}`
  );
  if (res.status !== 200) throw new Error("Fail");
  return res.data;
};
