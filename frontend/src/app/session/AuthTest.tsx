"use client";

import { updateAuctionTest } from "@/actions/auction";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

const AuthTest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<
    unknown | { status: string; message: string }
  >();

  function doUpdate() {
    setResult(undefined);
    setLoading(true);
    updateAuctionTest()
      .then((res) => setResult(res))
      .catch((err) => setResult(err))
      .finally(() => setLoading(false));
  }
  return (
    <div className="flex items-center gap-4">
      <Button
        className={`${loading ? "hidden" : "block"}`}
        onClick={() => doUpdate()}
      >
        Test Auth
      </Button>
      <Button disabled className={`${loading ? "block" : "hidden"}`}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
      <div>{JSON.stringify(result, null, 2)}</div>
    </div>
  );
};

export default AuthTest;
