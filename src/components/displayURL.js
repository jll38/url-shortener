"use client";
import { useState } from "react";
import { shorten } from "@/lib/shorten";
import ShortURL from "./shortURL";

export default function DisplayUrl({}) {
  const [url, setURL] = useState("");
  const [shortURL, setShortURL] = useState(null);
  const domain = (process.env.NEXT_PUBLIC_ENVIRONMENT === "dev" ? "http://localhost:3000/" : "tinyclicks.co");
  console.log(domain);
  async function handleURLSubmit(e) {
    const urlRegex =
      /^(http[s]?:\/\/){0,1}([www\.]{0,1})[a-zA-Z0-9\.\-\_]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    const isValidURL = urlRegex.test(url);
    if (isValidURL) {
      const result = domain + (await shorten(url));
      setShortURL(result);

      const urlInfo = {
        originalURL: url,
        shortURL: result,
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
          className="rounded-l-lg h-[40px] w-1/2 px-4 bg-[#ffddb8] focus:outline-payne-gray focus:outline"
          placeholder="Enter a link here"
          onChange={(e) => setURL(e.target.value)}
          autoComplete={"off"}
        ></input>
        <button
          className="py-2 px-4 bg-payne-gray hover:bg-delft-blue focus:outline-payne-gray focus:outline transition-all duration-200 text-white font-semibold rounded-r-lg"
          onClick={handleURLSubmit}
        >
          Shorten It!
        </button>
      </div>
      {!shortURL ? <div></div> : <ShortURL>{shortURL}</ShortURL>}
    </>
  );
}
