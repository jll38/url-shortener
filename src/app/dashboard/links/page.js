"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/authHandlers";
import { Tooltip } from "@mui/joy";
import { getTime, getDate } from "@/lib/time";
import { ENVIRONMENT } from "@/lib/constants";
import { TIME_ZONE } from "@/lib/constants";

import { CircularProgress } from "@mui/joy";

import {
  Sheet,
  Table,
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Input,
  Button,
} from "@mui/joy";

import DisplayUrl from "@/components/displayURL";

import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

export default function Links() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isAliasOpen, setIsAliasOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [newUrlOpen, setNewUrlOpen] = useState(false);

  const [newName, setNewName] = useState(null);
  const [newAlias, setNewAlias] = useState(null);
  const [newDestination, setNewDestination] = useState(null);

  const [loading, setLoading] = useState(true);
  const [renameRes, setRenameRes] = useState(null);

  const [error, setError] = useState(null);

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
            timeZone: TIME_ZONE,
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

  async function handleModify(operation) {
    let value;
    if (operation === "alias") {
      value = newAlias;
    } else if (operation === "name") {
      value = newName;
    } else if (operation === "destination") {
      value = newDestination;
    }
    setLoading(true);
    fetch("/api/dash/links/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: assignedUser.id,
        operation,
        value,
        selectedShort: data.data[selectedLink].shortURL,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        setRenameRes(info);
        if (info.status == 200) {
          {
            setIsAliasOpen(false);
            setIsRenameOpen(false);
          }
        }
      })
      .finally(
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      );
  }

  if (data)
    return (
      <main className="w-full h-screen grid place-items-center">
        <div className="h-full p-4 flex border w-full py-[10%]">
          <Sheet
            sx={{
              width: "700px",
              height: "100%",
              boxShadow: 3,
              padding: "16px",
            }}
            className={"rounded-[1.5rem] shadow-lg"}
          >
            <div className="text-[2em] font-bold flex justify-between">
              {selectedLink === null ? (
                <>
                  <div>Links</div>
                  <Button
                    variant="plain"
                    onClick={() => {
                      setNewUrlOpen(true);
                    }}
                  >
                    <AddIcon />
                  </Button>
                  <Modal open={newUrlOpen} >
                    <ModalDialog sx={{width: "600px"}} className="flex justify-center">
                      <ModalClose
                        onClick={() => {
                          setIsDestinationOpen(false);
                        }}
                      />
                      <Typography>New Link</Typography>
                      <hr />
                      <DisplayUrl variant={"modal"}/>
                    </ModalDialog>
                  </Modal>
                </>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedLink(null);
                    }}
                  >
                    <ArrowBackIcon />
                  </button>
                  <button
                    onClick={() => {
                      setIsRenameOpen(true);
                    }}
                  >
                    {data.data[selectedLink].name ||
                      data.data[selectedLink].originalURL.slice(
                        data.data[selectedLink].originalURL.indexOf("/") + 2,
                        data.data[selectedLink].originalURL.indexOf(".")
                      )}{" "}
                    <EditIcon />
                  </button>
                </div>
              )}
            </div>
            <hr />
            {data && (
              <>
                {selectedLink === null && (
                  <div className="pt-1">
                    {data.data.map((link, i) => {
                      let name;
                      if (link.name) {
                        name = link.name;
                      } else {
                        name = link.originalURL;
                        name = name.slice(
                          name.indexOf("/") + 2,
                          name.indexOf(".")
                        );
                      }

                      return (
                        <button
                          key={`link-${i}`}
                          className="w-full h-[40px] flex items-center hover:bg-slate-100"
                          onClick={() => {
                            setSelectedLink(i);
                          }}
                        >
                          <div
                            href=""
                            className="capitalize text-[1.25em] font-medium"
                          >
                            {name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
                {selectedLink !== null && (
                  <>
                    {" "}
                    <div></div>
                    <Modal open={isRenameOpen}>
                      <ModalDialog>
                        <ModalClose
                          onClick={() => {
                            setIsRenameOpen(false);
                          }}
                        />
                        <Typography>Rename Link</Typography>
                        <hr />
                        <Input
                          type="text"
                          placeholder="Enter an identifying name"
                          onChange={(e) => {
                            setNewName(e.target.value);
                          }}
                        ></Input>
                        {renameRes && (
                          <div
                            className={`${
                              renameRes.status != 200 ? "bg-red-600" : ""
                            }`}
                          >
                            {renameRes.message}
                          </div>
                        )}
                        <Button
                          disabled={loading}
                          variant="outlined"
                          sx={{ width: "50%" }}
                          onClick={() => {
                            handleModify("name");
                          }}
                        >
                          Rename
                        </Button>
                      </ModalDialog>
                    </Modal>
                    <button
                      onClick={() => {
                        setIsAliasOpen(true);
                      }}
                      className="flex items-center gap-2 justify-center  transition-all duration-100"
                    >
                      Shortened:{" "}
                      <span className="text-payne-gray hover:text-black">
                        {data.data[selectedLink].shortURL}{" "}
                        <EditIcon
                          fontSize="10px"
                          className="relative bottom-[3px]"
                        />
                      </span>{" "}
                    </button>
                    <Modal open={isAliasOpen}>
                      <ModalDialog>
                        <ModalClose
                          onClick={() => {
                            setIsAliasOpen(false);
                          }}
                        />
                        <Typography>New Link Alias</Typography>
                        <hr />
                        <Input
                          startDecorator={
                            <Sheet>
                              {ENVIRONMENT === "dev"
                                ? "localhost:3000/"
                                : "tinyclicks.co/"}
                            </Sheet>
                          }
                          type="text"
                          placeholder=""
                          onChange={(e) => {
                            setNewAlias(e.target.value);
                          }}
                        ></Input>
                        {renameRes && (
                          <div
                            className={`${
                              renameRes.status != 200 ? "bg-red-600" : ""
                            }`}
                          >
                            {renameRes.message}
                          </div>
                        )}
                        <Button
                          variant="outlined"
                          sx={{ width: "50%" }}
                          disabled={loading}
                          onClick={() => {
                            handleModify("alias");
                          }}
                        >
                          {loading ? <CircularProgress /> : "Confirm"}
                        </Button>
                      </ModalDialog>
                    </Modal>
                    <button
                      onClick={() => {
                        setIsDestinationOpen(true);
                      }}
                      className="flex items-center gap-2 justify-center  transition-all duration-100"
                    >
                      Destination:{" "}
                      <span className="text-payne-gray hover:text-black">
                        {data.data[selectedLink].originalURL}{" "}
                        <EditIcon
                          fontSize="10px"
                          className="relative bottom-[3px]"
                        />
                      </span>{" "}
                    </button>
                    <Modal open={isDestinationOpen}>
                      <ModalDialog>
                        <ModalClose
                          onClick={() => {
                            setIsDestinationOpen(false);
                          }}
                        />
                        <Typography>Rename Link</Typography>
                        <hr />
                        <Input
                          type="text"
                          placeholder="Enter an identifying name"
                          onChange={(e) => {
                            setNewDestination(e.target.value);
                          }}
                        ></Input>
                        {renameRes && (
                          <div
                            className={`${
                              renameRes.status != 200 ? "bg-red-600" : ""
                            }`}
                          >
                            {renameRes.message}
                          </div>
                        )}
                        <Button
                          disabled={loading}
                          variant="outlined"
                          sx={{ width: "50%" }}
                          onClick={() => {
                            handleModify("destination");
                          }}
                        >
                          Rename
                        </Button>
                      </ModalDialog>
                    </Modal>
                    <Typography sx={{ opacity: ".75" }}>
                      Created on {getDate(data.data[selectedLink].createdAt)}{" "}
                      {getTime(data.data[selectedLink].createdAt)}
                    </Typography>
                    <Typography sx={{ opacity: ".75" }}>
                      {data.data[selectedLink].createdAt !== data.data[selectedLink].modifiedAt && `Last modified at
                      ${getDate(data.data[selectedLink].modifiedAt)}
                      ${getTime(data.data[selectedLink].modifiedAt)}`}
                    </Typography>
                    <Typography>Password Protection: off</Typography>
                  </>
                )}
              </>
            )}
          </Sheet>
        </div>
        <div>
          <div>To Do:</div>
          <ul>
            <li>Today&apos;s Top Performer</li>
            <li>Link Creation Here</li>
            <li>Bulk Link Creation</li>
            <li>Password Protection</li>
          </ul>
        </div>
      </main>
    );

  return (
    <main className="w-screen h-screen grid place-items-center">
      <CircularProgress size="lg" />
    </main>
  );
}
