"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { deleteAuctionById } from "@/actions/auction";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  auctionId: string;
}

const DeleteAuctionByIdBtn = ({ auctionId }: Props) => {
  const [isSending, setSending] = useState<boolean>(false);
  const router = useRouter();
  const handleDelete = async (id: string) => {
    setSending(true);
    await deleteAuctionById(id);
    setSending(false);
    toast.success("Deleted Successful", {
      position: "top-right",
      className: "tracking-tighter font-semibold",
    });
    router.push("/");
  };
  return (
    <Button
      disabled={isSending}
      variant={"destructive"}
      onClick={() => handleDelete(auctionId)}
    >
      {!isSending ? (
        "Delete Auction"
      ) : (
        <>
          <Loader2 className="w-3 h-3 mr-2" />
          Sending ...
        </>
      )}
    </Button>
  );
};

export default DeleteAuctionByIdBtn;
