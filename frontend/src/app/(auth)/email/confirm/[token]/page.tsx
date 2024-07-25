"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/lib/api/useAuth";

type Props = {};

const ConfirmEmail = (props: Props) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(true);
  const [token, setToken] = useState("");

  const { verifyEmail } = useAuth();

  useEffect(() => {
    const queryToken = window.location.pathname.split("/").pop();
    if (queryToken) {
      setToken(queryToken);
    }
  }, []);

  useEffect(() => {
    const verifyEmailEffect = async () => {
      const response = await verifyEmail(token);

      if (response && response.status === 200) {
        setIsPending(false);
      }
    };
    if (token) {
      verifyEmailEffect();
    }
  }, [token]);
  return (
    <div>
      {isPending ? (
        <p>
          We&apos;re verifying your email &nbsp; &nbsp;
          <span>
            <img
              className="animate-spin h-5 w-5 mr-3 inline fill-primary-dark"
              src="/logo-icon.svg"
            />
          </span>
        </p>
      ) : (
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-xl">Congratulations</h1>
          <p>your email Is verifiied</p>
          <div className="py-4"></div>

          <div className="flex flex-col md:flex-row p-2 font-light text-sm text-slate-600 space-x-2">
            <Link href="/sign-in">Sign In</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmEmail;
