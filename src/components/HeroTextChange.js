"use client";
import React, { useState, useEffect } from "react";

export function HeroTextChange() {
  const words = ["Business", "Creators", "Educators", "Developers", "Designers"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  // Typing effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      setTimeout(() => setSubIndex((prev) => prev - 1), 250); // Delay before starting to delete
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const typingSpeed = reverse ? 50 : 150; 
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? typingSpeed : Math.max(typingSpeed, subIndex === words[index].length ? 1000 : 150));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Update text
  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <div className="-mt-4 mb-4 text-[5vh] ml-4 hidden md:block text-white drop-shadow-md">
      A simple, <br />
      yet powerful tool <br />
      for <span className="font-bold underline text-cyan-100">{text}<span className="blinking-cursor">|</span></span>
    </div>
  );
}
