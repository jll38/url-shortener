"use client";
import { Navbar } from "@/components/Navbar";
import redirect from "next/navigation";
import { useState, useEffect } from "react";

export default function ShortURLSettings({ params }) {
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [params.slug]);

  return (
    <main className="h-screen">
      <Navbar />
      <div className="h-[90vh] bg-peach flex justify-center items-center">
        <div className="w-[1280px] h-[640px] bg-payne-gray rounded-xl text-white font-bold text-4xl">
          {data ? (
            <>
              <a href={`http://localhost:3000/${params.slug}`}>
                
                
                http://tinyclicks.co/{params.slug}
              </a> <br/>
              <a href={data.url} target="_blank">{data?.url || "Loading..."} </a>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}
