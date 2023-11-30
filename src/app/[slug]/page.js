"use client";
import { useEffect, useState } from "react";
import redirect from "next/navigation";

export default function Redirect({ params }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to get client's IP address
    const getClientIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        console.log(data.ip);
        return data.ip;
      } catch (error) {
        console.error('Error getting IP:', error);
        return 'unknown';
      }
    };

    const fetchData = async () => {
      const ip = await getClientIp();
      const slug = params.slug;

      fetch(`/api/match-url?slug=${slug}&ip=${ip}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          window.location.assign(data.url);
        })
        .catch((error) => {
          console.error("Error:", error);
          window.location.assign("/");
        });
    };

    fetchData();
  }, [params.slug]);

  return <div className="h-screen"></div>;
}