import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center py-12 px-4 w-full min-h-screen bg-orangeaccent">
      <Image
        src="/logo.svg"
        width={198}
        height={30}
        style={{ height: "auto" }}
        alt="heatedmaps logo"
      />
      <div
        className="flex flex-col items-center w-full md:w-3/5 lg:w-2/5 py-12 px-8 bg-white rounded-xl my-12"
        style={{ boxShadow: "16px 16px" }}
      >
        {children}
      </div>
      <nav>
        <Link className="text-black" href="#">
          Privacy Policy
        </Link>
        &nbsp; &nbsp;
        <Link className="text-black" href="#">
          Terms Of Service
        </Link>
      </nav>
    </div>
  );
};

export default Layout;
