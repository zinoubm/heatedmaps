import React from "react";
import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; className?: string };

const H1 = ({ className, children }: Props) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-6xl",
        className
      )}
    >
      {children}
    </h1>
  );
};

const H2 = ({ className, children }: Props) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 pb-2 text-2xl md:text-4xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h1>
  );
};

const H3 = ({ className, children }: Props) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
};

const P = ({ className, children }: Props) => {
  return (
    <p
      className={cn("leading-7 text-lg [&:not(:first-child)]:mt-6", className)}
    >
      {children}
    </p>
  );
};

export { H1, H2, H3, P };
