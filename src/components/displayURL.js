"use client";
import { useState } from "react";

export default function DisplayUrl() {
    const [url, setURL] = useState("");
  return (
    <>
      <div>Your shortened URL is: </div>
    </>
  );
}
