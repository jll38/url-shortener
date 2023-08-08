"use client";
import React from "react";
import Link from "next/link";
export function Navbar({ color = "peach" }) {
  return (
    <nav
      className={`w-full  h-[75px] text-payne-gray  flex items-center px-10 justify-between bg-${color}`}
    >
      <div name="nav-left">
        <Link name="nav-logo" className="font-semibold text-[1.2em]" href="/">
          <i className="fa-solid fa-link"></i> TinyClicks
        </Link>
      </div>
      <div name="nav-right" className=" flex items-center gap-10">
        <Link
          className="hover:text-gray-600 transition-all duration-200"
          href="/features"
        >
          Features
        </Link>
        <div class="group relative flex justify-center">
          <button
            className="bg-payne-gray hover:bg-delft-blue text-white font-semibold py-2 px-4 rounded-full transition-all duration-200"
            onClick={() => {
              window.location.assign("/subscribe");
            }}
          >
            Get Premium
          </button>
          <span class="absolute top-10 scale-0 rounded bg-delft-blue p-2 text-xs text-white group-hover:scale-100 transition-all duration-100">
            ✨ Coming Soon!
          </span>
        </div>
      </div>
    </nav>
  );
}
