"use client";
import React from "react";
import Router from "next/router";

import { Table, Sheet, Typography, Skeleton, Input } from "@mui/joy";

import Link from "next/link";
import { CircularProgress } from "@mui/joy";
import Tooltip from "@mui/joy/Tooltip";

import { getUser } from "@/lib/authHandlers";
import { useState, useEffect } from "react";

import { NewLink } from "./../../../components/dashboard/linkportal/NewLink";

import { ProfilePicture } from "./../../../components/ProfilePicture";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { TruncateText } from "@/lib/general-helpers";

//AWS
import { uploadImage } from "@/lib/aws-helper";

export default function Geography() {
  const [data, setData] = useState(null);
  const [isEmptyData, setIsEmptyData] = useState(null);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const [unsavedChanges, setUnsavedChanges] = useState([]);

  const [changes, setChanges] = useState([]);

  const [newLink, setNewLink] = useState(false);
  const [newLinkOpen, setNewLinkOpen] = useState(false);

  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newProfilePictureLink, setNewProfilePictureLink] = useState(null);

  useEffect(() => {
    console.log(unsavedChanges);
  }, [unsavedChanges]);

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
      fetch(`/api/dash/link-portal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: assignedUser.id,
          operation: "retrieve-portal",
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
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
    <main className="h-screen overflow-x-hidden w-full p-4">
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
              picture={newProfilePictureLink || data.picture}
            />
            <div>
              {data.name || (
                <button className="flex justify-center items-center">
                  Name...
                  <EditIcon sx={{ fontSize: "16px" }} />
                </button>
              )}
            </div>
            <div>{data.description || "Description"}</div>
            <button onClick={saveChanges}></button>
            <div className="mt-2 mb-4 w-full">
              <h3 className="text-center font-bold">Links</h3>
              <div className="flex flex-col gap-4 items-center w-full">
                {data.links.map((link, i) => {
                  return (
                    <Sheet
                      key={"link-" + i}
                      sx={{
                        width: "400px",
                        height: "50px",
                        overflow: "hidden",
                        borderRadius: "20px",
                      }}
                      className="hover:bg-gray-300 drop-shadow-md transition-colors duration-200"
                    >
                      <Link
                        href={link.originalURL}
                        target="_blank"
                        className=""
                      >
                        <div className="w-[400px] h-[50px] grid place-items-center">
                          {link.name}
                        </div>
                      </Link>
                    </Sheet>
                  );
                })}

                {unsavedChanges.map((link, i) => {
                  if (link.type === "link")
                    return (
                      <Sheet
                        sx={{
                          width: "400px",
                          height: "100px",
                          overflow: "hidden",
                          borderRadius: "20px",
                        }}
                        className="drop-shadow-md transition-colors duration-200"
                      >
                        <div target="_blank" className="">
                          <div className="w-[400px] h-[100px] flex justify-start items-center px-10 gap-[40px]">
                            <div className="bg-gray-300 p-4 rounded-md">t</div>
                            <div>
                              <div className="font-semibold">
                                {link.name || ""}
                              </div>
                              <div className="text-slate-400">
                                {link.description &&
                                  TruncateText(description, 24)}
                              </div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </Sheet>
                    );
                })}
                {newLinkOpen && (
                  <NewLink
                    open={newLinkOpen}
                    setOpen={setNewLinkOpen}
                    unsavedChanges={unsavedChanges}
                    setUnsavedChanges={setUnsavedChanges}
                  />
                )}
                {!newLinkOpen && (
                  <Sheet
                    sx={{
                      width: "55px",
                      height: "50px",
                      overflow: "hidden",
                      borderRadius: "20px",
                    }}
                    className="hover:bg-gray-300 drop-shadow-md transition-colors duration-200"
                  >
                    <button
                      className="w-full h-full grid place-items-center"
                      onClick={() => {
                        setNewLinkOpen(true);
                      }}
                      disabled={newLinkOpen}
                    >
                      <AddIcon />
                    </button>
                  </Sheet>
                )}
              </div>
            </div>
            {data.public ? (
              "true"
            ) : (
              <button
                className="py-2 px-4 bg-[#0891b280] hover:bg-cyan-500 transition-colors duration-150 text-white rounded-lg"
                disabled={!unsavedChanges}
              >
                Publish
              </button>
            )}
          </section>
        </>
      )}
    </main>
  );
}