"use client";
import { useEffect, useState } from "react";
export default function Redirect({ params }) {
    const [data, setData] = useState(null)
    try {
        console.log("Slug is " + params.slug)
        const res = fetch(`/api/match-url?slug=${params.slug}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = res.json();
        return data;
      } catch (error) {
        console.error("Server did a fucky wucky");
        // handle the error according to your application logic
      }

  return (
    <div className="h-screen">
      <div>Slug: {params.slug}</div>
      <div>Redirecting to: {data} </div>
    </div>
  );
}
