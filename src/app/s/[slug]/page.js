"use client";
import { Navbar } from "@/components/Navbar";
import redirect from "next/navigation";
import { useState, useEffect } from "react";
import { Footer } from "@/components/footer";
import { domain } from "@/lib/domain";
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [params.slug]);

  return (
    <main className="h-screen">
      <div className="h-[90vh] bg-peach flex justify-center items-center">
        <div className="w-[1280px] h-[640px] bg-payne-gray rounded-xl text-white font-bold text-4xl flex justify-center items-center">
          <div>
            {data ? (
              <>
                <div className=" ">
                  <a
                    className="bg-white/25 p-2 rounded-lg"
                    href={`${domain}${params.slug}`}
                  >
                    {domain}
                    {params.slug}
                  </a>
                </div>
                <br />
                <div className="text-center">is</div>
                <br />
                <div className="flex justify-center items-center">
                  <a
                    className="bg-white/25 p-2 rounded-lg"
                    href={data.url}
                    target="_blank"
                  >
                    {data?.url || "Loading..."}{" "}
                  </a>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
