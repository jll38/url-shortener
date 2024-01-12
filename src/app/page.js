import { PerksItem } from "./../components/PerksItem";
import { HeroTextChange } from "./../components/HeroTextChange";
import { Footer } from "./../components/footer";
import { PremiumFeatureHome } from "./../components/PremiumFeatureHome";
import Image from "next/image";
import Link from "next/link";
import HeroAnim from "@/components/hero-anim";
import DisplayUrl from "@/components/displayURL";
import { Navbar } from "@/components/Navbar";
import MouseAnim from "@/components/MouseAnim";
import AdBanner from "@/components/AdBanner";
import PublicIcon from '@mui/icons-material/Public';
export default function Home() {
  return (
    <>
    <main className=" h-screen">
      <div className="z-20">
        <Navbar />
      </div>
      <section name="hero-cta" className="h-[87vh] overflow-hidden">
        <div className="absolute h-[87vh] w-full bg-black -z-10 blur-s overflow-hidden">
          <div className="h-full w-full bg-gradient-to-tr from-cyan-300 via-cyan-200 to-sky-500 scale-[1.25]"></div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-center gap-2 h-full z-30 pt-[4rem] bg-black/20">
          <div
            name="shortener"
            className="h-[100%] md:w-1/2 w-full flex justify-center items-center"
          >
            <div className="w-full flex items-left flex-col justify-center text-payne-gray font-medium relative 20 px-12 -mt-[6rem]">
              <HeroTextChange />
              <DisplayUrl />
            </div>
          </div>
          <div className="px-10 md:w-1/2 w-full md:h-[100%] flex justify-start flex-col mt-[10%] text-gray-100">
            <h1 className="text-[2.25vh] font-medium leading-[2em]">
              <span className="drop-shadow-md">Welcome to </span>
              <br />
              <span className="text-[2.5em] sm:text-[3em] font-semibold text-cyan-100 drop-shadow-md">
                TinyClicks.co
              </span>
            </h1>
            <div className="text-[2.25vh] font-medium drop-shadow-md">
              Streamline your digital presence in just a click.
            </div>
            <Link
              href="/about"
              className="text-[1.5vh] opacity-80 hover:underline"
            >
              Learn how we can help meet your needs
            </Link>
          </div>
        </div>
      </section>
      {/* <section className="bg-slate-100 border px-10 py-5 h-[500px]">
        <div className="w-full flex flex-col items-center gap-4">
          <h3 className="text-payne-gray font-medium">Premium Perks</h3>
          <div className="flex justify-center items-center">
            <PerksItem title="Geotagging Heatmap" description="Gain accurate, real-time data on where your links are being clicked throughout the world." icon={<PublicIcon sx={{fontSize: "2em"}}/>}/>
          </div>
        </div>
      </section>
      <section name="hero-cta" className=" bg-slate-100 border px-10 py-5">
        <div className="w-full flex justify-center">
          <h3 className="text-payne-gray font-medium">
            Loved by businesses and creators alike
          </h3>
        </div>
      </section> */}
       <Footer />
    </main>
   
    </>
  );
}
