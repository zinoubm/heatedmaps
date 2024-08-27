"use client";

import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Cross1Icon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Toggle } from "@/components/ui/toggle";
import AccountManagement from "@/components/global/accountManagement";

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

type SideBarLinkProps = {
  href: string;
  label: string;
};

const SideBarLink = ({ href, label }: SideBarLinkProps) => {
  const pathName = usePathname();

  const isActive = pathName === href;
  return (
    <Link
      className={`w-full block rounded-md text-left font-normal px-8 py-3 text-base ${
        !isActive && "text-white"
      } ${
        isActive && "text-primary-dark bg-light-blue"
      } transition-colors duration-5 ease-out hover:text-primary-accent hover:bg-light-blue/25`}
      href={href}
    >
      {label}
    </Link>
  );
};

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const [isToggle, setIsToggle] = useState(!isMobile);
  const pathName = usePathname();

  return (
    <div className="flex">
      {isToggle && (
        <>
          <div className="transition-all fixed xl:static flex flex-col items-center w-4/5 p-4 pt-8 xl:w-1/5 inset-y-0 z-50 bg-black h-screen">
            <span className="flex items-center gap-16">
              <Image
                src="/logo-contrast.svg"
                width={0}
                height={0}
                style={{ width: "164px", height: "auto" }}
                alt="Heatedmaps logo"
              />
              <Button
                className="p-3 bg-blue-100 bg-opacity-20 hover:bg-blue-100 hover:bg-opacity-100 hover:text-black md:hidden"
                onClick={() => setIsToggle(false)}
              >
                <Cross1Icon color="white" width="20" height="20" />
              </Button>
            </span>

            <ul className="flex flex-col space-y-1 items-center w-full mt-12">
              {menuOptions.map((menuItems) => {
                return (
                  <li className="w-full" key={menuItems.name}>
                    <SideBarLink
                      href={menuItems.href}
                      label={menuItems.name}
                    ></SideBarLink>
                  </li>
                );
              })}
            </ul>

            <AccountManagement />
          </div>
        </>
      )}

      <main className=" flex-grow max-h-[calc(100vh-60px)] w-10 flex-col flex">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4 border-b sticky top-0 z-[10] p-6 w-full">
            <Toggle
              onClick={() => {
                setIsToggle(!isToggle);
              }}
            >
              {isToggle ? (
                <DoubleArrowLeftIcon width="24" height="24" />
              ) : (
                <DoubleArrowRightIcon width="24" height="24" />
              )}
            </Toggle>
            <Image
              className="xl:hidden"
              src="/logo.svg"
              width={0}
              height={0}
              style={{ width: "164px", height: "auto" }}
              alt="Heatedmaps logo"
            />
            <h1 className="text-4xl hidden xl:block">
              {menuOptions.find((key) => key.href === pathName)?.name}
            </h1>
          </div>
        </div>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
