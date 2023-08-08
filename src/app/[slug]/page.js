"use client";
import { useEffect, useState } from "react";
import redirect from 'next/navigation'
export default function Redirect({ params }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const slug = params.slug;

    fetch(`/api/match-url?slug=${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
        window.location.assign(data.url)
      })
      .catch((error) => {
        console.error("Error:", error);
        window.location.assign("/")
      });
  }, [params.slug]);

  return (
    <div className="h-screen">

    </div>
  );
}
