"use client";
import { useEffect, useState } from "react";
import redirect from "next/navigation";

export default function Redirect({ params }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    // Function to get client's IP address
    console.log("user agent");
    const userAgent = getUserAgent();
    const { browser, device } = userAgent;
    const getClientIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        console.log(data.ip);
        return data.ip;
      } catch (error) {
        console.error("Error getting IP:", error);
        return "unknown";
      }
    };

    const fetchData = async () => {
      const ip = await getClientIp();
      const slug = params.slug;
      const referrer = document.referrer;
      console.log("Source: " + typeof referrer);
      fetch(`/api/match-url?slug=${slug}&ip=${ip}&source=${referrer}&browser=${browser}&device=${device}`)
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

  function getUserAgent() {
    var userAgent = window.navigator.userAgent;
    console.log(userAgent);
    // Detecting browser
    var browser = "Unknown Browser";
    switch (true) {
      case userAgent.includes("Firefox"):
        browser = "Firefox";
        break;
      case userAgent.includes("SamsungBrowser"):
        browser = "Samsung Browser";
        break;
      case userAgent.includes("Opera") || userAgent.includes("OPR"):
        browser = "Opera";
        break;
      case userAgent.includes("Trident"):
        browser = "Internet Explorer";
        break;
      case userAgent.includes("Edge"):
        browser = "Edge";
        break;
      case userAgent.includes("Chrome"):
        browser = "Chrome";
        break;
      case userAgent.includes("Safari"):
        browser = "Safari";
        break;
      default:
        browser = "Other";
        break;
    }

    // Detecting device
    var device = "Unknown Device";
    switch (true) {
      case userAgent.includes("iPhone"):
        device = "iPhone";
        break;
      case userAgent.includes("iPad"):
        device = "iPad";
        break;
      case userAgent.includes("Linux"):
        device = "Linux/MacOS";
        break;
      case userAgent.includes("Android"):
        device = "Android";
        break;
      case userAgent.includes("Windows"):
        device = "Windows PC";
        break;
      case userAgent.includes("Macintosh"):
        device = "Macintosh";
        break;
      default:
        browser = "Other";
        break;
    }

    return { browser: browser, device: device };
  }
  return <div className="h-screen"></div>;
}
