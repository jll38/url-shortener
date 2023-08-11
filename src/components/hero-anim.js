"use client";
import { useEffect } from "react";
import SplitType from "split-type";
import gsap from "gsap";

function HeroAnim() {
    useEffect(() => {
      const text = new SplitType("#hero-text");
      const characters = document.querySelectorAll(".char");
  
      gsap.set(characters, { y: '100%', opacity: 0 });
  
      gsap.to(characters, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: .2,
        duration: .1
      });
    }, []);
  
    return (
      <div 
        className="text-[4em] md:text-[8em] overflow-y-hidden font-bold text-payne-gray" 
        id="hero-text"
      >
        TinyClicks
      </div>
    );
  }
  
  export default HeroAnim;