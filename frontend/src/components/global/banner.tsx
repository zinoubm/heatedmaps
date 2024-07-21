import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="inline-flex items-center justify-center bg-black w-full text-white py-4 ">
      <div className="py-1 text-center text-sm">
        Get a lifetime deal for HeatedMaps,{" "}
        <a
          href={`https://appsumo.com`}
          className="underline hover:text-blue-200 duration-200 transition-colors"
        >
          Grab your key at AppSumo
        </a>
        .
      </div>
    </div>
  );
};

export default Banner;
