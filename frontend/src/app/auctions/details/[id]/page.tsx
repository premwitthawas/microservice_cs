/* eslint-disable @next/next/no-img-element */
import { fetchAcutionDetailsById } from "@/actions/auction";
import { auth } from "@/auth";
import AuctionDetail from "@/components/auctions/AuctionDetail";
import CountdownTimer from "@/components/auctions/CountdownTimer";
import DeleteAuctionByIdBtn from "@/components/auctions/DeleteAuctionByIdBtn";
import EditButton from "@/components/auctions/EditButton";
import Heading from "@/components/helpers/Heading";

const DeatilPage = async ({ params }: { params: { id: string } }) => {
  const data = await fetchAcutionDetailsById(params.id);
  const session = await auth();
  return (
    <div>
      {/* HEADING */}
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Heading title={`Make:${data.make} | Model:${data.model}`} />
          {session?.user.username === data.seller ? (
            <EditButton autionId={data.id} />
          ) : null}
           {session?.user.username === data.seller ? (
            <DeleteAuctionByIdBtn auctionId={data.id} />
          ) : null}
        </div>
        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Time Remaining:</h3>
          <CountdownTimer auctionEnd={data.auctionEnd} />
        </div>
      </div>
      {/* CONTENT MAIN */}
      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="bg-gray-200 relative w-full aspect-video overflow-hidden rounded-lg">
          <img
            src={data.imageUrl}
            alt={data.id}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="border-2 rounded-lg p-2 bg-gray-100">
          <Heading title="Bids" />
        </div>
      </div>
      {/* Details */}
      <div className="mt-3 grid grid-cols-2">
        <AuctionDetail auction={data} />
      </div>
    </div>
  );
};

export default DeatilPage;
