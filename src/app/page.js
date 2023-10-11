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
    <main className="h-screen overflow-x-hidden">
      <Navbar/>
      <section name="lite-shortener" className="h-[625px] bg-peach">
        <MouseAnim />
        <div className="w-full h-[500px] flex items-center flex-col justify-center text-moonstone font-medium relative z-20">
          <HeroAnim />
          <div className="-mt-4 mb-4 text-[1.4em]">Links Made Easy</div>

          <DisplayUrl />
          <AdBanner/>
        </div>
      </section>
      <section
        name="premium-cta"
        className="w-full bg-payne-gray h-[1100px] sm:h-[750px] p-[30px] pt-0 text-white"
      >
        <div className="py-[30px]">
          <h2 className="text-center font-semibold text-[1.5em] sm:text-[2.5em]">
            Unlock Premium Perks
          </h2>
          <div className="text-center text-white/50">Coming Soon!</div>
        </div>
        <div className=" flex flex-col items-center">
          <div className="sm:flex justify-around text-white/80 sm:w-[600px] lg:w-[1000px]">
            <PremiumFeatureHome icon="chart-simple" text="Enhanced Analytics" />
            <PremiumFeatureHome icon="table-columns" text="Robust Dashboard" />
            <PremiumFeatureHome
              icon="boxes-stacked"
              text="Bulk Link Shortening"
            />
          </div>
          <div className="sm:flex justify-around text-white/80 sm:w-[600px] lg:w-[1000px] sm:mt-12">
            <PremiumFeatureHome icon="globe" text="Geotagging & Heat Map" />
            <PremiumFeatureHome icon="lock" text="Password Protection" />
            <PremiumFeatureHome icon="link" text="Custom Link Aliases" />
          </div>
          <div className="text-center text-white/50">& more!</div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
