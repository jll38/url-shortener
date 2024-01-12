"use client";
import React, { useState } from "react";
export function PerksItem({ title, description, icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="border border-cyan-500 w-[300px] h-[150px] rounded-lg hover:scale-110 transition-all duration-150 overflow-hidden"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <div
        className={`w-full h-full flex flex-col items-center justify-center  transition-opacity duration-150 ${
          hovered && "opacity-0"
        }`}
      >
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      <div
        className={`h-[101%] w-full ${
          hovered && `-mt-[50%]`
        } bg-payne-gray transition-all duration-150 z-50 grid place-items-center px-10`}
      >
        <div className="text-slate-100">{description}</div>
      </div>
    </div>
  );
}
