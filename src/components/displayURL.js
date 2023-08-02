"use client";
import { useState } from "react";

export default function DisplayUrl({}) {
  const [url, setURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  function handleURLSubmit() {
    const urlRegex = /^(http[s]?:\/\/){0,1}([www\.]{0,1})[a-zA-Z0-9\.\-\_]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    const isValidURL = urlRegex.test(url);
    if (isValidURL) {
      alert("valid url :)");
    } else {
      alert("Enter a valid URL");
    }
  }

  return (
    <>
      <div className="flex w-full justify-center">
        <input
          type="text"
          id="urlInput"
          className="rounded-l-lg h-[40px] w-1/2 px-4"
          placeholder="Enter a link here"
          onChange={(e) => setURL(e.target.value)}
        ></input>
        <button
          className="py-2 px-4 bg-purple-400 text-white font-semibold rounded-r-lg"
          onClick={handleURLSubmit}
        >
          Shorten It!
        </button>
      </div>
      <div>Original URL: {url}</div>
      <div>Your shortened URL is: {shortURL}</div>
    </>
  );
}
