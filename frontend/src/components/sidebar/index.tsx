"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

const menuOptions = [
  {
    name: "Setup",
    href: "/setup",
    description: "Add the tracking script to your sites.",
  },
  {
    name: "Heatmaps",
    href: "/heatmaps",
    description: "Add the tracking script to your sites.",
  },
  {
    name: "Recordings",
    href: "/recordings",
    description: "Add the tracking script to your sites.",
  },
  {
    name: "Pricing",
    href: "/pricing",
    description: "Add the tracking script to your sites.",
  },
  {
    name: "Support",
    href: "/support",
    description: "Add the tracking script to your sites.",
  },
  {
    name: "Plan",
    href: "/plan",
    description: "Add the tracking script to your sites.",
  },
];

type Props = {};

const MenuOptions = (props: Props) => {
  const [isToggle, setIsToggle] = useState(true);
  const pathName = usePathname();

  return (
    <>
      {/* {isToggle && (
        <nav className="bg-dark-blue h-screen w-1/5 flex flex-col gap-4 py-8 px-8">
          <span>
            <Image
              src="/logo-contrast.svg"
              width={164}
              height={30}
              style={{ height: "auto" }}
              alt="Heatedmaps logo"
            />
            <Button
              className="p-3bg-red-600 hover:bg-primary-light hover:text-primary-dark"
              onClick={() => setIsToggle(false)}
            >
              <Cross1Icon width="20" height="20" />
            </Button>
          </span>
          <div className="mt-8"></div>
          <TooltipProvider>
            <ul className="flex flex-col items-start gap-2">
              {menuOptions.map((menuItems) => (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <li key={menuItems.name}>
                      <Link
                        className="text-white hover:text-white"
                        href={menuItems.href}
                      >
                        {menuItems.name}
                      </Link>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-dark-blue bg-white p-2 rounded">
                      {menuItems.name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </ul>
          </TooltipProvider>
          <ul className="mt-auto flex flex-col ">
            <Button>Get LTD</Button>
            <Button>User</Button>
          </ul>
        </nav>
      )} */}
    </>
  );
};

export default MenuOptions;
