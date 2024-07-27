import React, { Children } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  variant: "default" | "cta";
  className?: string;
  children: React.ReactNode;
};

const LinkButton = ({ href, variant, className, children }: Props) => {
  let defaultColor = "bg-light-blue";
  let defaultTextColor = "text-dark-blue";
  let defaultDropShadow = "";
  if (variant === "cta") {
    defaultColor = "bg-light-orange";
    defaultTextColor = "text-white";
    defaultDropShadow = "drop-shadow-[2px_4px_16px_rgba(236,90,19,0.5)]";
  }
  return (
    <Link
      href={href}
      className={cn(
        `rounded-md bg-light-blue ${defaultTextColor} ${defaultColor} ${defaultDropShadow} py-3 px-4 md:px-8 font-bold text-xs md:text-sm hover:bg-dark-blue hover:text-white hover:filter-none`,
        className
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
