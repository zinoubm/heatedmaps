import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-xl font-bold my-4">Please verify your email</h1>
      <p>
        We sent a verification email to your address, please check your Inbox.
      </p>
      {/* todo */}
      <Button className="my-4">Resend Email</Button>
    </div>
  );
};

export default page;
