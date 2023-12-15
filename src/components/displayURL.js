"use client";
import { useState, useEffect } from "react";
import { shorten } from "@/lib/shorten";
import ShortURL from "./shortURL";
import { domain } from "@/lib/domain";
import { motion } from "framer-motion";

import { getUser } from "@/lib/authHandlers";
export default function DisplayUrl({}) {
  const [url, setURL] = useState("");
  const [shortURL, setShortURL] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, [])
  async function handleURLSubmit(e) {
    const httpURL = ensureHttp(url)
    const urlRegex =
      /^(http[s]?:\/\/){0,1}([www\.]{0,1})[a-zA-Z0-9\.\-\_]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    const isValidURL = urlRegex.test(httpURL);
    if (isValidURL) {
      const result = domain + (await shorten(httpURL));
      setShortURL(result);

      const urlInfo = {
        originalURL: url,
        shortURL: result,
        userId: user.id,
      };

      fetch("/api/create-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urlInfo),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => console.log("Response data:", data))
        .catch((err) => console.log("Error:", err));
    } else {
      alert("Enter a valid URL");
    }
  }

  function ensureHttp(url) {
    if (!url) return url; // Return the url as is if it's empty or null

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "http://" + url; // Add 'http://' if neither 'http://' nor 'https://' is present
    }

    return url; // Return the original url if it already has 'http://' or 'https://'
  }

  return (
    <>
      <div className="flex w-full justify-left items-center drop-shadow-lg">
        <input
          type="text"
          id="urlInput"
          className="h-[40px] w-[60%] px-4 bg-gray-100 focus:outline-payne-gray focus:outline "
          placeholder="Enter a long URL here..."
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
