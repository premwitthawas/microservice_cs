import { fetchAcutionDetailsById } from "@/actions/auction";
import AuctionFormUpdate from "@/components/auctions/AuctionFormUpdate";
import Heading from "@/components/helpers/Heading";
import { Separator } from "@/components/ui/separator";
import React from "react";

const UpdateByIdPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetchAcutionDetailsById(params.id);
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update your car!"
        subtitle="Please enter the details of yu car"
      />
      <Separator className="mb-2" />
      <AuctionFormUpdate auction={data} id={params.id} />
    </div>
  );
};

export default UpdateByIdPage;
