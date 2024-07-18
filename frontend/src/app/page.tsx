import Navbar from "@/components/global/navbar";
import Image from "next/image";
import { H1, H2, P } from "@/components/global/typography";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const FeatureCard = (props: Props) => {
  return (
    <div className="flex flex-col px-12 items-center md:px-0 bg-transparent mt-8">
      <div className="h-16 w-16 bg-black rounded-full"></div>
      <H2 className="text-center lg:text-4xl mt-4">Clicks Tracking Heatmaps</H2>
      <P className="text-center">
        Use our Intuitive form builder and embed It on your website or host It
        on your domain.
      </P>
    </div>
  );
};

const PricingCard = (props: Props) => {
  return (
    <div className="flex flex-col absolute bottom-0 w-[348px] py-16 px-2 items-center bg-transparent bg-white rounded">
      <div className="h-16 w-16 bg-black rounded-full"></div>
      <H2 className="text-center lg:text-4xl mt-4">Clicks Tracking Heatmaps</H2>
      <P className="text-center">
        Use our Intuitive form builder and embed It on your website or host It
        on your domain.
      </P>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-orangeaccent">
      <Navbar />

      <section className="flex w-fullflex flex-col items-center align-middle pt-36 md:pt-48 lg:px-32">
        <H1 className="text-center">
          Visualize User Behavior Using Heat maps.
        </H1>

        <div className="px-8 lg:px-24 mt-4">
          <P className="text-center">
            HeatMaped helps you boost conversion rates and user experience by
            visualizing heat maps over your website, funnels, and landing pages.
          </P>
        </div>

        <div className="inline-flex items-center space-x-2 mt-6">
          <Link
            href="#"
            className="rounded-full bg-black border-black border-2 text-white py-3 px-8 md:px-12 font-bold text-xs md:text-sm hover:bg-white hover:text-black"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="rounded-full border-black border-2 text-black py-3 px-8 md:px-12 font-bold text-xs md:text-sm hover:bg-black hover:text-white"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-12"></div>

        <Image
          src="/screenshot.png"
          alt="product-screenshot"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </section>

      <section className="flex flex-col items-center lg:flex-row justify-center space-x-8 bg-black py-4 md:py-8 w-full mt-12">
        <H2 className="text-white text-center lg:text-start">
          Get your brand featured with
        </H2>
        <Image
          src="/logo-contrast.svg"
          width={260}
          height={30}
          style={{ height: "auto" }}
          alt="heatedmaps logo"
        />
      </section>

      <section className="flex flex-col items-center w-full lg:px-12 mt-24">
        <H1 className="text-center px-8 mt-8 md:mt-12 md:w-3/5">
          Don’t Imagine, Just Observe
        </H1>

        <div className="flex flex-col w-full justify-center space-x-2 md:flex-row mt-12 items-center">
          <FeatureCard />
          <FeatureCard />
          <FeatureCard />
        </div>
      </section>

      <section className="flex flex-col items-center w-full lg:px-12 mt-24">
        <H1 className="text-center px-8 mt-8 md:mt-12 md:w-3/5">
          Get A Life Time Deal!
        </H1>
      </section>

      <section className="h-96"></section>

      <section className="flex flex-col h-24 relative items-center w-full bg-black ">
        <PricingCard />
      </section>

      <footer className="w-full py-24 bg-black">
        <div className="text-white">placehoder</div>
      </footer>
    </main>
  );
}