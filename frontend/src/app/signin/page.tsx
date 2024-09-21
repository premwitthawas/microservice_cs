import EmptyFilter from "@/components/helpers/EmptyFilter";
import React from "react";

const SigninPage = ({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) => {
  return (
    <EmptyFilter
      title="You need to logged in to do that"
      subtitle="Please click below to login"
      showLogin
      callbackUrl={searchParams.callbackUrl}
    />
  );
};

export default SigninPage;
