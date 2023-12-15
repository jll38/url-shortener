"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/authHandlers";

import { Sheet, Table } from "@mui/joy";

export default function DashLink({params}) {
  const [data, setData] = useState(null);

  //Data States
  const [topPerformers, setTopPerformers] = useState(null);

  // async function assignUser() {
  //   const userData = getUser(); // Fetch user data
  //   setUser(userData); // Set user data to state
  //   return userData; // Return the user data
  // }
  // useEffect(() => {
  //   async function fetchData() {
  //     const assignedUser = await assignUser();
  //     if (assignedUser) {
  //       fetch("/api/dash/get-link", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           userId: assignedUser.id,
  //           slug: slug,
  //         }),
  //       })
  //         .then((res) => {
  //           return res.json();
  //         })
  //         .then((info) => {
  //           setData(info);
  //         });
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <main className="w-full h-full">
      <div className="h-[320px] p-4 flex border w-full">
      { params.slug }
      </div>
      <div className="h-[320px] p-4 flex border w-full">
        
      </div>
    </main>
  );
}
