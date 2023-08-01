import Image from "next/image";
import Link from "next/link";
import HeroAnim from "@/components/hero-anim";

export default function Home() {

  return (
    <main className="h-screen">
      <div className="w-full  h-[75px]  text-gray-700 flex items-center px-10 justify-between">
        <div name="nav-left">
          <div name="nav-logo" className="font-semibold text-[1.2em]">
            <i className="fa-solid fa-link"></i> URL Shortener
          </div>
        </div>
        <div name="nav-right" className=" flex items-center gap-10">
          <Link
            className="hover:text-gray-600 transition-all duration-200"
            href="/"
          >
            Features
          </Link>
          <button className="border-2 border-purple-500 bg-purple-500/50 hover:bg-purple-700/75 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200">
            Get Premium
          </button>
        </div>
      </div>
      <div className="w-full h-[500px] flex items-center flex-col justify-center">
        <HeroAnim />
        <div className="pt-2">
          URL Shortener is a free tool that allows you create easily shareable
          shortened URLs
        </div>
        <div className="text-purple-800 font-semibold pt-6 pb-2 text-md">
          Give it a try!
        </div>
        <div className="flex w-full justify-center">
          <input
            type="text"
            className="rounded-l-lg h-[40px] w-1/2 px-4"
            placeholder="Enter a link here"
          ></input>
          <button className="py-2 px-4 bg-purple-400 text-white font-semibold rounded-r-lg">Shorten It!</button>
        </div>
        <div>Your shortened URL: </div>
      </div>
      <div className="w-full bg-purple-600 h-[300px]">
        <div>Premium Features</div>
        <ul>
          <li>API</li>
          <li>Detailed Analytics</li>
        </ul>
      </div>
    </main>
  );
}
