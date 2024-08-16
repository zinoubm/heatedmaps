import React from "react";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "./linkButton";

type Props = {};

const Navbar = async (props: Props) => {
  return (
    <header className="sticky top-0 w-full py-8 px-4 lg:px-36 backdrop-blur-lg z-[100] flex items-center justify-between">
      <Link href="/">
        <Image
          src="/logo.svg"
          width={0}
          height={0}
          style={{ width: "168px", height: "auto" }}
          alt="heatedmaps logo"
        />
      </Link>
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          <li>
            <Link href="#product">Product</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="https://blog.heatedmaps.com">Blog</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        {/* <Link
          href="/sign-up"
          className="rounded-md bg-light-blue text-dark-blue py-2 px-4 md:px-8 font-bold text-xs md:text-sm hover:bg-dark-blue hover:text-white"
        >
          Get Started
        </Link> */}
        <LinkButton href="/sign-up" variant={"default"}>
          Get Started
        </LinkButton>
        {false && (
          <Link
            href="#"
            className="rounded-full bg-dark-blue text-white py-4 px-8"
          >
            Dashboard
          </Link>
        )}
      </aside>
    </header>
  );
};

export default Navbar;
