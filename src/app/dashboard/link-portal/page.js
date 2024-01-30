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

import { UnsavedChanges } from "@/components/UnsavedChanges";
import { ProfilePicture } from "./../../../components/ProfilePicture";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import { TruncateText } from "@/lib/general-helpers";

//AWS
import { uploadImage } from "@/lib/aws-helper";
import {
  S3_PROFILE_PICTURE_DIRECTORY_PREFIX,
  S3_LINK_PICTURE_DIRECTORY_PREFIX,
  AWS_S3_PREFIX,
} from "@/lib/constants";

export default function LinkPortal() {
  const [data, setData] = useState(null);
  const [isEmptyData, setIsEmptyData] = useState(null);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const [unsavedChanges, setUnsavedChanges] = useState([]);

  const [changes, setChanges] = useState([]);

  const [newName, setNewName] = useState(null);
  const [confirmedNewName, setConfirmedNewName] = useState(null);

  const [newDescription, setNewDescription] = useState(null);
  const [confirmedNewDescription, setConfirmedNewDescription] = useState(null);

  const [newLink, setNewLink] = useState(false);
  const [newLinkOpen, setNewLinkOpen] = useState(false);

  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [newProfilePictureLink, setNewProfilePictureLink] = useState(null);

  useEffect(() => {
    console.log(unsavedChanges);
  }, [unsavedChanges]);

  useEffect(() => {
    /*
      Converts file to a readable format for <Image/> 
      component and either adds it to the "unsavedChanges"
      array or replaces the previous instance in the array
      */
    if (newProfilePicture) {
      const object = URL.createObjectURL(newProfilePicture);
      setNewProfilePictureLink(object);
      if (unsavedChanges.length > 0) {
        const newPictureObject = {
          name: S3_PROFILE_PICTURE_DIRECTORY_PREFIX + newProfilePicture.name,
          description: null,
          type: "profile-image",
          image: new Blob([newProfilePicture], {
            type: newProfilePicture.type,
          }),
          link: null,
          action: "edit",
        };
        let replaced = false;
        const newArr = unsavedChanges.map((obj) => {
          if (obj && obj["type"] === "profile-image") {
            replaced = true;
            return newPictureObject;
          }
          return obj;
        });
        setUnsavedChanges([...newArr]);

        if (!replaced) {
          setUnsavedChanges([...unsavedChanges, newPictureObject]);
        }
      } else {
        setUnsavedChanges([
          {
            name: null,
            description: null,
            type: "profile-image",
            image: new Blob([newProfilePicture], {
              type: newProfilePicture.type,
            }),
            link: null,
            action: "edit",
          },
        ]);
      }
    }
  }, [newProfilePicture]);

  async function saveChanges() {
    const assignedUser = await assignUser();
    if (newProfilePicture)
      uploadImage(newProfilePicture, S3_PROFILE_PICTURE_DIRECTORY_PREFIX);
    fetch(`/api/dash/link-portal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: assignedUser.id,
        operation: "save",
        data: unsavedChanges,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
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
          <UnsavedChanges hasUnsavedChanges={unsavedChanges.length > 0}/>
            <ProfilePicture
              editable={user ? true : false}
              setNewProfilePicture={setNewProfilePicture}
              picture={newProfilePictureLink || AWS_S3_PREFIX + data.picture}
            />
            {newName !== null ? (
              <div>
                <Input
                  variant="plain"
                  placeholder="Display name"
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                ></Input>
                <div className="w-full flex justify-between text-slate-500">
                  <button
                    className="hover:text-slate-700"
                    onClick={() => {
                      if (unsavedChanges.length > 0) {
                        const newNameObject = {
                          name: newName,
                          description: null,
                          type: "name",
                          image: null,
                          link: null,
                        };
                        let replaced = false;
                        const newArr = unsavedChanges.map((obj) => {
                          if (obj && obj["type"] === "name") {
                            replaced = true;
                            return newNameObject;
                          }
                          return obj;
                        });
                        setUnsavedChanges([...newArr]);

                        if (!replaced) {
                          setUnsavedChanges([
                            ...unsavedChanges,
                            {
                              name: newName,
                              description: null,
                              type: "name",
                              image: null,
                              link: null,
                              action: "edit",
                            },
                          ]);
                        }
                      } else {
                        setUnsavedChanges([
                          {
                            name: newName,
                            description: null,
                            type: "name",
                            image: null,
                            link: null,
                            action: "edit",
                          },
                        ]);
                      }
                      setConfirmedNewName(newName);
                      setNewName(null);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="hover:text-slate-700"
                    onClick={() => {
                      setNewName(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                disabled={user === null}
                onClick={() => {
                  setNewName("");
                }}
              >
                {confirmedNewName ? (
                  <button className="flex justify-center items-center font-semibold">
                    {confirmedNewName}
                    <EditIcon sx={{ fontSize: "16px" }} />
                  </button>
                ) : (
                  <button className="flex justify-center items-center font-semibold">
                    {data.name || "Name..."}
                    <EditIcon sx={{ fontSize: "16px" }} />
                  </button>
                )}
              </button>
            )}
            {newDescription !== null ? (
              <div>
                <Input
                  variant="plain"
                  placeholder="Description"
                  onChange={(e) => {
                    setNewDescription(e.target.value);
                  }}
                ></Input>
                <div className="w-full flex justify-between text-slate-500">
                  <button
                    className="hover:text-slate-700"
                    onClick={() => {
                      if (unsavedChanges.length > 0) {
                        const newDescriptionObject = {
                          name: newDescription,
                          description: null,
                          type: "description",
                          image: null,
                          link: null,
                        };
                        let replaced = false;
                        const newArr = unsavedChanges.map((obj) => {
                          if (obj && obj["type"] === "description") {
                            replaced = true;
                            return newDescriptionObject;
                          }
                          return obj;
                        });
                        setUnsavedChanges([...newArr]);

                        if (!replaced) {
                          setUnsavedChanges([
                            ...unsavedChanges,
                            {
                              name: newDescription,
                              description: null,
                              type: "description",
                              image: null,
                              link: null,
                              action: "edit",
                            },
                          ]);
                        }
                      } else {
                        setUnsavedChanges([
                          {
                            name: newDescription,
                            description: null,
                            type: "description",
                            image: null,
                            link: null,
                            action: "edit",
                          },
                        ]);
                      }
                      setConfirmedNewDescription(newDescription);
                      setNewDescription(null);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="hover:text-slate-700"
                    onClick={() => {
                      setNewDescription(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                disabled={user === null}
                onClick={() => {
                  setNewDescription("");
                }}
                className="max-w-[300px] break-words overflow-hidden"
              >
                {confirmedNewDescription ? (
                  <div className="flex justify-center items-center max-w-[300px] break-words">
                    {confirmedNewDescription}
                    <EditIcon sx={{ fontSize: "16px" }} />
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full break-words">
                    {data.description || "Description"}
                    <EditIcon sx={{ fontSize: "16px" }} />
                  </div>
                )}
              </button>
            )}
            <button onClick={saveChanges}></button>
            <div className="mt-2 mb-4 w-full">
              <h3 className="text-center font-bold">Links</h3>
              <div className="flex flex-col gap-4 items-center w-full">
                {data.links &&
                  data.links.map((link, i) => {
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
                  if (link.type === "link" && link.action === "add")
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
                        <div target="_blank" className="relative">
                          <button className="absolute right-4 top-2 text-slate-800 hover:text-slate-600">
                            Remove
                          </button>
                          <div className="w-[400px] h-[100px] flex justify-start items-center px-10 gap-[40px]">
                            <div className="bg-gray-300 p-4 rounded-md">t</div>
                            <div>
                              <div className="font-semibold">
                                {link.name || ""}
                              </div>
                              <div className="text-slate-400">
                                {link.description &&
                                  TruncateText(link.description, 24)}
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
              <button
                className="py-2 px-4 bg-[#0891b280] hover:bg-cyan-500 transition-colors duration-150 text-white rounded-lg"
                disabled={!unsavedChanges}
                onClick={saveChanges}
              >
                Save
              </button>
            ) : (
              <button
                className="py-2 px-4 bg-[#0891b280] hover:bg-cyan-500 transition-colors duration-150 text-white rounded-lg"
                disabled={!unsavedChanges}
                onClick={saveChanges}
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
