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
import { GoogleTagManager } from "@next/third-parties/google";
import Banner from "@/components/global/banner";
import LinkButton from "@/components/global/linkButton";

type Props = {
  icon: string;
  title: string;
  description: string;
};

const FeatureCard = ({ icon, title, description }: Props) => {
  return (
    <div className="flex flex-col w-full md:w-80 xl:w-96 items-center bg-transparent mt-8">
      <Image
        src={icon}
        alt="clicks"
        width={124}
        height={30}
        style={{ height: "auto" }}
      />
      <H2 className="text-center lg:text-4xl mt-4">{title}</H2>
      <P className="text-center">{description}</P>
    </div>
  );
};

const PricingCard = ({ icon, title, description }: Props) => {
  return (
    <div className="flex flex-col absolute bottom-0 h-[524px] w-[348px] py-16 px-2 items-center bg-transparent bg-white rounded">
      <Image
        src={icon}
        alt="product-screenshot"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <H2 className="text-center lg:text-4xl mt-4">{title}</H2>
      <P className="text-center">{description}</P>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GoogleTagManager gtmId="GTM-PSFF9DPG" />
      <Banner />
      <Navbar />

      <section className="flex w-fullflex flex-col items-center align-middle pt-12 md:pt-20 lg:px-32">
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
          <LinkButton href="/sign-in" variant={"default"}>
            Sign In
          </LinkButton>
          <LinkButton href="/sign-up" variant={"cta"}>
            Get Starteds
          </LinkButton>
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

      <section className="flex flex-col items-center lg:flex-row justify-center space-x-8 bg-dark-blue py-4 md:py-8 w-full mt-12">
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

      <section id="product" className="flex flex-col items-center w-full mt-24">
        <H1 className="text-center px-8 mt-8 md:mt-12 md:w-3/5">
          Don’t Imagine, Just Observe
        </H1>

        <div className="flex flex-col w-full justify-center md:space-x-2 md:flex-row mt-12 items-center">
          <FeatureCard
            icon="/features/clicks.svg"
            title="Clicks Tracking Heatmaps"
            description="Use our Intuitive form builder and embed It on your website or host It on your domain."
          />
          <FeatureCard
            icon="/features/scrolls.svg"
            title="Scroll Tracking Heatmaps"
            description="We provide an easy to use drag and drop canvas to build workflows that automates boring tasks"
          />
          <FeatureCard
            icon="/features/recordings.svg"
            title="User Session Recordings"
            description="Respondily saves you time by Instantly responding to customer questions, Automate your customer service and Improve customer retention."
          />
        </div>
      </section>

      <section className="flex flex-col items-center w-full lg:px-12 mt-24">
        <H1 className="text-center px-8 mt-8 md:mt-12 md:w-3/5">
          Get A Life Time Deal!
        </H1>
      </section>

      <section className="h-96"></section>

      <section className="flex flex-col h-24 relative items-center w-full bg-dark-blue ">
        <PricingCard icon={""} title={""} description={""} />
      </section>

      <footer className="w-full flex flex-col items-center py-12 bg-dark-blue">
        <div className="flex flex-col items-center">
          <Image
            src="/logo-contrast.svg"
            width={260}
            height={30}
            style={{ height: "auto" }}
            alt="heatedmaps logo"
          />
          <LinkButton
            className="hover:bg-light-orange my-2"
            href="/sign-up"
            variant={"default"}
          >
            Get Started
          </LinkButton>
        </div>
        <div className="flex flex-col items-center w-full justify-between">
          <nav className="py-8">
            <ul className="flex items-center gap-4 list-none">
              <li>
                <Link className="text-white" href="/sign-up">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link className="text-white" href="/sign-in">
                  Sign In
                </Link>
              </li>
              <li>
                <Link className="text-white" href="#">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="text-white" href="https://blog.heatedmaps.com">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="text-white" href="#">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <Link className="text-white" href="#">
              Privacy Policy
            </Link>
            &nbsp; &nbsp;
            <Link className="text-white" href="#">
              Terms Of Service
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
