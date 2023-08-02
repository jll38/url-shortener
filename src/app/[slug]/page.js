"use client";
import { useEffect } from "react";
export default function Redirect({ params }) {
    useEffect({
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
    }, [])
  return (
    <div className="h-screen">
      <div>Slug: {params.slug}</div>
      <div>Redirecting to: {} </div>
    </div>
  );
}
