"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/authHandlers";

import { getTime, getDate } from "@/lib/time";

import { Sheet, Table } from "@mui/joy";

export default function Links() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Data States
  const [topPerformers, setTopPerformers] = useState(null);

  async function assignUser() {
    const userData = getUser(); // Fetch user data
    setUser(userData); // Set user data to state
    return userData; // Return the user data
  }
  useEffect(() => {
    async function fetchData() {
      const assignedUser = await assignUser();
      if (assignedUser) {
        fetch("/api/dash/links", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: assignedUser.id,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((info) => {
            setData(info);
          });
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="w-full h-full">
      <div className="h-[320px] p-4 flex border w-full"></div>
      <div className="h-[320px] p-4 flex border w-full">
        <Sheet
          sx={{
            width: "700px",
            height: "100%",
            boxShadow: 3,
            padding: "16px",
          }}
          className={"rounded-[1.5rem] shadow-lg"}
        >
          <h2 className="text-[2em] font-bold">Links</h2>
          <hr/>
          {data && (
            <div className="pt-1">
              {data.data.map((link, i) => {
                let name;
                if (link.name) {
                  name = link.name;
                } else {
                  name = link.originalURL;
                  name = name.slice(name.indexOf("/") + 2, name.indexOf("."));
                }

                return (
                  <div key={`link-${i}`} className="h-[40px] flex  items-center">
                    <a href="" className="capitalize text-[1.25em] font-medium">
                      {name}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </Sheet>
      </div>
    </main>
  );
}
