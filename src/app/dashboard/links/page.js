"use client";
import { CheckedSearchResult } from "./../../../components/dashboard/CheckedSearchResult";
import React from "react";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/authHandlers";
import { Tooltip } from "@mui/joy";
import { getTime, getDate } from "@/lib/time";
import { ENVIRONMENT } from "@/lib/constants";
import { TIME_ZONE } from "@/lib/constants";

import { CircularProgress } from "@mui/joy";
import CopyClipboard from "@/components/CopyClipboard";
import {
  Sheet,
  Table,
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Input,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Radio,
  RadioGroup,
  FormLabel,
  Checkbox,
} from "@mui/joy";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import SearchIcon from "@mui/icons-material/Search";
import DisplayUrl from "@/components/displayURL";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

export default function Links() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchIsFocused, setSearchIsFocused] = useState(false);
  const [collectionName, setCollectionName] = useState(null);
  const [newCollectionItems, setNewCollectionItems] = useState([]);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isAliasOpen, setIsAliasOpen] = useState(false);
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const [newUrlOpen, setNewUrlOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [newName, setNewName] = useState(null);
  const [newAlias, setNewAlias] = useState(null);
  const [newDestination, setNewDestination] = useState(null);

  const [selectedLink, setSelectedLink] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const [loading, setLoading] = useState(true);
  const [renameRes, setRenameRes] = useState(null);

  //Data States
  const [topPerformers, setTopPerformers] = useState(null);

  async function assignUser() {
    const userData = getUser(); // Fetch user data
    setUser(userData); // Set user data to state
    return userData; // Return the user data
  }

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching Link data");
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
            console.log("Response");
            return res.json();
          })
          .then((info) => {
            console.log("info");
            console.log(info);
            setData(info);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!data) return;

    const results = data.data.links.filter((item) => {
      return item.name !== null
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : item.originalURL
            .slice(7)
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });

    setFilteredResults(results);
  }, [data, searchTerm]);

  async function handleModify(operation) {
    const assignedUser = await assignUser();
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
        selectedShort: data.data.links[selectedLink].shortURL,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        setRenameRes(info);
        if (info.status == 200) {
          setIsAliasOpen(false);
          setIsRenameOpen(false);
          setNewUrlOpen(false);
        } else {
          setErrorMessage(info.message);
        }
      })
      .finally(
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      );
  }

  async function createCollection() {
    const assignedUser = await assignUser();
    console.log("test collection");
    fetch("/api/dash/links/collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: assignedUser.id,
        operation: "create",
        links: newCollectionItems,
        name: collectionName !== null ? collectionName : "Unnamed Collection",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((info) => {
        console.log(info);
      })
      .finally(() => {
        window.location.reload();
      });
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
              {selectedLink === null && selectedCollection === null ? (
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
                  <Modal open={newUrlOpen}>
                    <ModalDialog
                      sx={{ width: "600px" }}
                      className="flex justify-center"
                    >
                      <ModalClose
                        onClick={() => {
                          setNewUrlOpen(false);
                        }}
                      />
                      <Tabs>
                        <TabList>
                          <Tab>Link</Tab>
                          <Tab>Collection</Tab>
                        </TabList>

                        <TabPanel value={0}>
                          <DisplayUrl variant={"modal"} />
                        </TabPanel>
                        <TabPanel value={1} className="flex flex-col gap-2">
                          <Typography>Collection Name</Typography>
                          <Input
                            type="text"
                            id="collectionNameInput"
                            className="h-[40px] w-[60%] px-4 bg-gray-100 focus:outline-payne-gray focus:outline "
                            placeholder="New Collection"
                            onChange={(e) => {
                              setCollectionName(e.target.value);
                            }}
                            autoComplete={"off"}
                          ></Input>
                          <div className="w-[60%]">
                            <Typography>Add Links</Typography>
                            <Input
                              startDecorator={<SearchIcon />}
                              type="text"
                              id="collectionNameInput"
                              className="h-[40px] px-4 bg-gray-100 focus:outline-payne-gray focus:outline "
                              placeholder="Search"
                              onChange={(e) => {
                                setSearchTerm(e.target.value);
                              }}
                              onFocus={() => setSearchIsFocused(true)}
                              onBlur={() => {
                                if (!searchTerm) {
                                  setSearchIsFocused(false);
                                }
                              }}
                              autoComplete={"off"}
                            ></Input>
                            {searchIsFocused && searchTerm && (
                              <div className="flex flex-col border-2 bg-white absolute w-[56%]">
                                {filteredResults.length > 0 ? (
                                  filteredResults.map((item, i) => {
                                    return (
                                      <CheckedSearchResult
                                        key={"search-result" + i}
                                        value={
                                          item.name !== null
                                            ? item.name
                                            : item.originalURL.slice(7)
                                        }
                                        valueId={item.id}
                                        isChecked={newCollectionItems.includes(
                                          item.id
                                        )}
                                        setNewCollectionItems={
                                          setNewCollectionItems
                                        }
                                        newCollectionItems={newCollectionItems}
                                      />
                                    );
                                  })
                                ) : (
                                  <div className="h-[30px] flex justify-between items-center px-2">
                                    No results found
                                  </div>
                                )}
                              </div>
                            )}
                            <button
                              className="py-2 px-4 bg-payne-gray hover:bg-delft-blue focus:outline-payne-gray focus:outline transition-all duration-200 text-white font-semibold rounded-lg w-[8rem] mt-2"
                              onClick={() => {
                                createCollection();
                              }}
                            >
                              Create
                            </button>
                          </div>
                        </TabPanel>
                      </Tabs>
                    </ModalDialog>
                  </Modal>
                </>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedLink(null);
                      setSelectedCollection(null);
                    }}
                  >
                    <ArrowBackIcon />
                  </button>
                  {data &&
                    data.data &&
                    data.data.links &&
                    data.data.links[selectedLink] && (
                      <button
                        onClick={() => {
                          setIsRenameOpen(true);
                        }}
                      >
                        {data.data.links[selectedLink].name ||
                          data.data.links[selectedLink].originalURL.slice(
                            data.data.links[selectedLink].originalURL.indexOf(
                              "/"
                            ) + 2,
                            data.data.links[selectedLink].originalURL.indexOf(
                              "."
                            )
                          )}{" "}
                        <EditIcon />
                      </button>
                    )}
                </div>
              )}
            </div>
            <hr />
            {data && (
              <>
                {selectedLink === null && selectedCollection === null && (
                  <div className="pt-1 max-h-[300px] overflow-y-scroll">
                    {data.data.collections.map((link, i) => {
                      return (
                        <button
                          key={`link-${i}`}
                          className="w-full h-[60px] flex items-center hover:bg-slate-100"
                          onClick={() => {
                            setSelectedCollection(i);
                          }}
                        >
                          <div
                            href=""
                            className="capitalize text-[1.25em] font-medium flex items-center gap-2"
                          >
                            <Inventory2Icon /> {link.name}
                          </div>
                        </button>
                      );
                    })}
                    {data.data.links.map((link, i) => {
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
                          className="w-full h-[40px] flex items-center gap-4 hover:bg-slate-100"
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
                          <div
                            href=""
                            className="text-[.75em] font-medium opacity-75 italic" 
                          >
                            {link.originalURL}
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
                        {errorMessage && <div>{errorMessage}</div>}

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
                    <div className="flex">
                      {" "}
                      <button
                        onClick={() => {
                          setIsAliasOpen(true);
                        }}
                        className="flex items-center gap-2 justify-center  transition-all duration-100"
                      >
                        Shortened:{" "}
                        <span className="text-payne-gray hover:text-black">
                          {data.data.links[selectedLink].shortURL}{" "}
                          <EditIcon
                            fontSize="10px"
                            className="relative bottom-[1px]"
                          />
                        </span>{" "}
                      </button>{" "}
                      <CopyClipboard
                        value={data.data.links[selectedLink].shortURL}
                      />
                    </div>
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
                            console.log(newAlias);
                          }}
                        ></Input>
                        {errorMessage && <div>{errorMessage}</div>}

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
                        {data.data.links[selectedLink].originalURL}{" "}
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
                      Created on{" "}
                      {getDate(data.data.links[selectedLink].createdAt)}{" "}
                      {getTime(data.data.links[selectedLink].createdAt)}
                    </Typography>
                    <Typography sx={{ opacity: ".75" }}>
                      {data.data.links[selectedLink].createdAt !==
                        data.data.links[selectedLink].modifiedAt &&
                        `Last modified at
                      ${getDate(data.data.links[selectedLink].modifiedAt)}
                      ${getTime(data.data.links[selectedLink].modifiedAt)}`}
                    </Typography>
                    <Typography>Password Protection: off</Typography>
                  </>
                )}
                {selectedCollection !== null && selectedLink === null && (
                  <div>
                    {data.data.collections[selectedCollection].links.map(
                      (link, i) => {
                        let name;
                        if (link.link.name) {
                          name = link.link.name;
                        } else {
                          name = link.link.originalURL;
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
                      }
                    )}
                  </div>
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
