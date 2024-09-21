'use client';
import { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import AuctionPagenation from "./AuctionPagenation";
import { Auction } from "@/types/autions";
import { fetchListAuctions } from "@/actions/auction";
import FiltersAuction from "./FiltersAuction";
import { PagedResult } from "@/types";
import { useParamsStore } from "@/hooks/useParams.store";
import { useShallow } from "zustand/react/shallow";
import qs from 'query-string';
import EmptyFilter from "../helpers/EmptyFilter";

const Listings = () => {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStore(useShallow(state => ({
    pageNumber: state.pageNumber,
    pageCount: state.pageCount,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    seller: state.seller,
    winner: state.winner
  })));
  const setParams = useParamsStore(state => state.setParams);
  const urlParams = qs.stringifyUrl({ url: '', query: params });

  const setPageNumber = (pageNumber: number) => {
    setParams({
      pageNumber: pageNumber
    })
  }

  useEffect(() => {
    fetchListAuctions(urlParams).then(data => {
      setData(data)
    });
  }, [urlParams])

  if (!data) return <h3>loading....</h3>


  return (
    <>
      <FiltersAuction />
      {
        data.totalCount === 0 ? (<EmptyFilter showReset />
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6">
              {data &&
                data.results.map((auction) => {
                  return <AuctionCard key={auction.id} auction={auction} />;
                })}
            </div>
            <div className="mt-4 flex items-center justify-center">
              {data && <AuctionPagenation pageCount={data.pageCount} currentPage={params.pageNumber} pageChaged={setPageNumber} />}
            </div>
          </>
        )
      }
    </>
  );
};

export default Listings;
