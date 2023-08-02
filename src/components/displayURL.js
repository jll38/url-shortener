"use client";
import { useState } from "react";
import { shorten } from "@/lib/shorten";

export default function DisplayUrl({}) {
  const [url, setURL] = useState("");
  const [shortURL, setShortURL] = useState("http://localhost:3000/bruh");

  function handleURLSubmit(e) {
    const urlRegex =
      /^(http[s]?:\/\/){0,1}([www\.]{0,1})[a-zA-Z0-9\.\-\_]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    const isValidURL = urlRegex.test(url);
    if (isValidURL) {
      setShortURL(shorten(url));
      const urlInfo = {
        originalURL: url,
        shortURL: shortURL,
      };
      console.log("Sending request with body:", urlInfo);
      fetch("/api/create-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urlInfo),
      })
        .then((response) => {
          console.log("Received response:", response);
          return response.json();
        })
        .then((data) => console.log("Response data:", data))
        .catch((err) => console.log("Error:", err));
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
