import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { P } from "./typography";

type Props = {};

const Navbar = async (props: Props) => {
  return (
    <header className="fixed right-0 left-0 top-0 py-8 px-4 lg:px-16 backdrop-blur-lg z-[100] flex items-center justify-between">
      <Image
        src="/logo.svg"
        width={198}
        height={30}
        style={{ height: "auto" }}
        alt="heatedmaps logo"
      />
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          <li>
            <Link href="#">Product</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <Link
          href="#"
          className="rounded-full border-black border-2 text-black py-2 px-4 md:px-8 font-bold text-xs md:text-sm hover:bg-black hover:text-white"
        >
          Get Started
        </Link>
        {false && (
          <Link href="#" className="rounded-full bg-black text-white py-4 px-8">
            Dashboard
          </Link>
        )}
      </aside>
    </header>
  );
};

export default Navbar;
