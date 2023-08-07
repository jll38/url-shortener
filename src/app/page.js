import Image from "next/image";
import Link from "next/link";
import HeroAnim from "@/components/hero-anim";
import DisplayUrl from "@/components/displayURL";

export default function Home() {
  return (
    <main className="h-screen ">
      <div className="h-[650px] bg-peach">
        <div className="w-full  h-[75px] text-gray-700 flex items-center px-10 justify-between">
          <div name="nav-left">
            <div
              name="nav-logo"
              className="font-semibold text-[1.2em] text-payne-gray"
            >
              <i className="fa-solid fa-link"></i> TinyClicks
            </div>
          </div>
          <div name="nav-right" className=" flex items-center gap-10">
            <Link
              className="hover:text-gray-600 transition-all duration-200"
              href="/"
            >
              Features
            </Link>
            <button className="bg-payne-gray hover:bg-delft-blue text-white font-semibold py-2 px-4 rounded-full transition-all duration-200">
              Get Premium
            </button>
          </div>
        </div>
        <div className="w-full h-[500px] flex items-center flex-col justify-center text-moonstone font-medium">
          <HeroAnim />
          <div className="-mt-4 mb-4 text-[1.4em]">Links Made Easy</div>

          <DisplayUrl />
        </div>
      </div>
      <div className="w-full bg-payne-gray h-[300px]">
        <h2 className="text-white ">Premium Features</h2>
        <ul className="sm:flex justify-between px-24">
          <li>API</li>
          <li>Detailed Analytics</li>
          <li>URL Dashboard</li>
        </ul>
      </div>
    </main>
  );
}
