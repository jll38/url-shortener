"use client";
import React from "react";

import { Table, Sheet, Typography, Skeleton } from "@mui/joy";

import Link from "next/link";
import { CircularProgress } from "@mui/joy";
import Tooltip from "@mui/joy/Tooltip";

import { getUser } from "@/lib/authHandlers";
import { useState, useEffect } from "react";

import { ProfilePicture } from "./../../../components/ProfilePicture";

export default function Geography() {
  const [data, setData] = useState(null);
  const [isEmptyData, setIsEmptyData] = useState(null);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const [unsavedChanges, setSavedChanges] = useState(false);

  const [changes, setChanges] = useState([]);

  const [newProfilePicture, setNewProfilePicture] = useState(null);

  useEffect(() => {
    if (newProfilePicture) {
      //Handle if a new picture was already added.
      //Replace the existing "newPicture" in the array of changes
    } else {
      setChanges;
    }
  }, [newProfilePicture]);

  async function saveChanges() {
    setSavedChanges(false);
    //Add backend query
  }

  async function assignUser() {
    const userData = getUser(); // Fetch user data
    setUser(userData); // Set user data to state
    return userData; // Return the user data
  }

  const fetchData = async () => {
    const assignedUser = await assignUser();
    if (assignedUser) {
      fetch(`/api/dash`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: assignedUser.id,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            setIsEmptyData(true);
          }
          setData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    const loggedInUser = getUser();

    if (loggedInUser) {
      setUser(loggedInUser);
      fetchData();

      // // Call the API every X seconds
      // const interval = setInterval(fetchData, DASHBOARD_FETCH_INTERVAL * 1000); // replace X with your interval in seconds

      // Clean up the interval on component unmount
      //return () => clearInterval(interval);
    } else {
      window.location.assign("/login");
    }
  }, []);

  function getTime(zTime) {
    const date = new Date(zTime);

    return `${date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    })}`;
  }

  function getDate(zTime) {
    const date = new Date(zTime);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  return (
    <main className="h-screen overflow-x-hidden w-full">
      {!data && (
        <div className="h-screen w-full flex justify-center items-center">
          <CircularProgress size="lg" />
        </div>
      )}
      {data && (
        <>
          <section className="h-full relative w-full flex flex-col items-center">
            <ProfilePicture
              editable={user ? true : false}
              setNewProfilePicture={setNewProfilePicture}
              picture={newProfilePicture || user.profilePicture}
            />
            <p>description</p>
            <button onClick={saveChanges}></button>
          </section>
        </>
      )}
    </main>
  );
}
