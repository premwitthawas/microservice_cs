"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  autionId: string;
}

const EditButton = (props: Props) => {
  const router = useRouter();
  return (
    <div className="col-span-1">
      <Button
        variant={"default"}
        onClick={() => router.push(`/auctions/update/${props.autionId}`)}
      >
        Update Auctions
      </Button>
    </div>
  );
};

export default EditButton;
