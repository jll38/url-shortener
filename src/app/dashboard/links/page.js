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
      <div className="h-[320px] p-4 flex border w-full">
        <Sheet sx={{ width: "100%" }}>
          <Table>
            <thead>
              <th></th>
            </thead>
            <tbody>
              {data && (
                <div>
                  {data.data.map((link, i) => {
                    return (
                      <tr key={`test-${i}`}>
                        <td>{link.shortURL}</td>
                        <td>{getTime(link.createdAt)}</td>
                        <td>{getDate(link.createdAt)}</td>
                      </tr>
                    );
                  })}
                </div>
              )}
            </tbody>
          </Table>
        </Sheet>
      </div>
    </main>
  );
}
