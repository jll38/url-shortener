"use client";
import { useEffect } from "react";
import gsap from "gsap";
export default function MouseAnim() {
  useEffect(() => {
    const mouseAnim = document.querySelectorAll(".mouse-anim");
    gsap.to(mouseAnim, {
      x: 3000,
      stagger: 0.1,
      delay: 0.2,
      duration: 10,
    });
  });
  return (
    <div className="relative">
      <div name="cursor-anim-container" className="absolute w-full h-full">
        <img
          src="/images/mouse.webp"
          className="w-[25px] translate-x-[-100px] mouse-anim"
          alt=" "
        />
        <img
          src="/images/mouse.webp"
          className="w-[25px] translate-x-[-100px] translate-y-[200px] mouse-anim"
          alt=" "
        />
        <img
          src="/images/mouse.webp"
          className="w-[25px] translate-x-[-100px] translate-y-[100px] mouse-anim"
          alt=" "
        />
      </div>
    </div>
  );
}
