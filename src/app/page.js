import { Footer } from "./../components/footer";
import { PremiumFeatureHome } from "./../components/PremiumFeatureHome";
import Image from "next/image";
import Link from "next/link";
import HeroAnim from "@/components/hero-anim";
import DisplayUrl from "@/components/displayURL";
import { Navbar } from "@/components/Navbar";
import MouseAnim from "@/components/MouseAnim";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  return (
    <main className="h-screen overflow-x-hidden overflow-y-hidden">
      <Navbar />
      <div className="flex flex-col-reverse md:flex-row justify-center gap-2 h-[80%]">
        <section
          name="lite-shortener"
          className="h-[100%] md:w-1/2 w-full flex justify-center items-center"
        >
          <div className="w-full flex items-left flex-col justify-center text-payne-gray font-medium relative z-20 px-12">
            <div className="-mt-4 mb-4 text-[1.75em] ml-4">
              A simple, <br />
              yet powerful tool <br />
              for <span className="font-bold underline">YOU</span>
            </div>
            <DisplayUrl />
          </div>
        </section>
        <section className="px-10 md:w-1/2 w-full md:h-[100%] flex justify-start flex-col mt-[10%]">
          <h1 className="text-[1.25em]">
            Welcome to <br />
            <span className="text-[2.5em] sm:text-[3em] text-payne-gray font-semibold">
              TinyClicks.co
            </span>
          </h1>
          <div className="text-[1.25em]">
            Streamline your digital presence in just a click.
          </div>
          <Link
            href="/about"
            className="text-[.75em] opacity-80 hover:underline"
          >
            Learn how we can help meet your needs
          </Link>
        </section>
      </div>
      <Footer />
    </main>
  );
}
