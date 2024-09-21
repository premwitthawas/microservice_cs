"use client";
import { useParamsStore } from "@/hooks/useParams.store";
import React from "react";
import Heading from "./Heading";
import { Button } from "../ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
  callbackUrl?: string;
}

const EmptyFilter = ({
  title = "No matches for this filter",
  subtitle = "Try Changing or reset the filter",
  showReset,
  showLogin,
  callbackUrl,
}: Props) => {
  const reset = useParamsStore((state) => state.resetParams);
  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <Button variant={"destructive"} onClick={() => reset()}>
            <ResetIcon className="w-5 h-5 mr-2" /> Remove Filters
          </Button>
        )}
        {showLogin && (
          <Button
            variant={"link"}
            onClick={() => signIn("id-server", { callbackUrl: callbackUrl })}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyFilter;
