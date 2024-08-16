"use client";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

// https://medium.com/intelliconnect-engineering/fixing-hydration-issues-in-next-js-and-zustand-a-simple-solution-bd0a8deff6cc
const HydrationProvider = ({ children }: Props) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};

export default HydrationProvider;
