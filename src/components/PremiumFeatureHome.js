import React from "react";
export function PremiumFeatureHome({icon, text}) {
  return <div className="w-[300px] h-[150px] sm:h-[200px] flex flex-col items-center hover:text-white transition-all duration-100">
            <i className={`fa-solid fa-${icon} text-[3.5em] sm:text-[4.5em]`}></i>
            <div className="text-[1.25em] sm:text-[2em] font-medium text-center pt-2">{text}</div>
          </div>;
}
  