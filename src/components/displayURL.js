"use client";
import { useState, useEffect } from "react";
import { shorten } from "@/lib/shorten";
import ShortURL from "./shortURL";
import { Input } from "@mui/joy";
import { domain } from "@/lib/domain";
import { motion } from "framer-motion";
import { ENVIRONMENT } from "@/lib/constants";

import { getUser } from "@/lib/authHandlers";
export default function DisplayUrl({ variant = "home" }) {
  const [url, setURL] = useState("");
  const [shortURL, setShortURL] = useState(null);
  const [user, setUser] = useState(null);
  const [resShortURL, setResShortURL] = useState(null);

  const [name, setName] = useState(null);
  const [alias, setAlias] = useState(null);
  const [rawAlias, setRawAlias] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    console.log(url);
  }, [url]);
  async function handleURLSubmit(variant) {
    setResShortURL(null);
    console.log(url);
    const httpURL = ensureHttp(url);
    const urlRegex =
      /^(http[s]?:\/\/){0,1}([www\.]{0,1})[a-zA-Z0-9\.\-\_]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    const isValidURL = urlRegex.test(httpURL);
    if (isValidURL) {
      const result = domain + (await shorten(httpURL));
      setShortURL(result);

      setTimeout(() => {
        const urlInfo = {
          originalURL: url,
          shortURL: result,
          userId: user ? user.id : null,
          name,
          alias,
          rawAlias,
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
          .then((data) => {
            console.log("Response data:", data);
            setResShortURL(data.short);
            console.log(variant);
            if (variant === "modal") window.location.reload();
          })
          .catch((err) => console.log("Error:", err));
      }, 1000);
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

  if (variant === "home")
    return (
      <>
        <div className="flex justify-left items-center drop-shadow-lg h-[40px] w-full md:w-[50vw]">
          <Input
            startDecorator="http://"
            type="text"
            id="urlInput"
            className="h-full px-4 bg-gray-100 focus:outline-cyan-700 focus:outline  w-full md:w-[40%]"
            placeholder="Enter a long URL here..."
            onChange={(e) => setURL("http://" + e.target.value)}
            autoComplete={"off"}
          ></Input>
          <button
            className="py-2 px-4  bg-cyan-600 hover:bg-cyan-700 focus:outline-payne-gray focus:outline  text-white font-semibold rounded-r-lg h-full"
            onClick={handleURLSubmit}
          >
            Shorten It!
          </button>
        </div>
        {!resShortURL ? <div></div> : <ShortURL>{resShortURL}</ShortURL>}
      </>
    );
  if (variant === "modal")
    return (
      <>
        <div className="flex flex-col w-full gap-4">
          <Input
            type="text"
            id="nameInput"
            className="h-[40px] w-[60%] px-4 bg-gray-100 focus:outline-payne-gray focus:outline "
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            autoComplete={"off"}
          ></Input>
          <Input
            startDecorator="http://"
            type="text"
            id="urlInput"
            className="h-[40px] w-[60%] px-4 bg-gray-100 focus:outline-payne-gray focus:outline "
            placeholder="Enter a long URL here..."
            onChange={(e) => setURL("http://" + e.target.value)}
            autoComplete={"off"}
          ></Input>
          <Input
            startDecorator={`http://${
              ENVIRONMENT === "dev" ? "localhost:3000/" : "tinyclicks.co/"
            }`}
            type="text"
            id="aliasInput"
            className="h-[40px] w-[60%] px-4 bg-gray-100 focus:outline-payne-gray focus:outline "
            placeholder="Alias"
            onChange={(e) => {
              setAlias(
                `http://${
                  ENVIRONMENT === "dev" ? "localhost:3000/" : "tinyclicks.co/"
                }` + e.target.value
              );
              setRawAlias(e.target.value);
            }}
            autoComplete={"off"}
          ></Input>
          <button
            className="py-2 px-4 bg-payne-gray hover:bg-delft-blue focus:outline-payne-gray focus:outline transition-all duration-200 text-white font-semibold rounded-lg w-[8rem]"
            onClick={() => {
              handleURLSubmit("modal");
            }}
          >
            Create
          </button>
        </div>
      </>
    );
}
