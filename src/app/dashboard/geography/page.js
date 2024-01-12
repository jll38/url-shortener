"use client";
import React from "react";

import { Table, Sheet, Typography, Skeleton } from "@mui/joy";

import mapboxgl from "mapbox-gl";
import Link from "next/link";
import { CircularProgress } from "@mui/joy";
import Tooltip from "@mui/joy/Tooltip";

import { getUser } from "@/lib/authHandlers";
import { useState, useEffect } from "react";
import { DASHBOARD_FETCH_INTERVAL, MAPBOX_API_KEY } from "@/lib/constants";
import Draggable from "gsap/Draggable";

//Icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ArrowDropUp, Close } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
export default function Geography() {
  const [data, setData] = useState(null);
  const [isEmptyData, setIsEmptyData] = useState(null);
  const [recordLimit, setRecordLimit] = useState(10);
  const [moreRecords, setMoreRecords] = useState(true);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Widget States
  const [topLocationsWidgetOpen, setTopLocationsWidgetOpen] = useState(true);

  mapboxgl.accessToken = MAPBOX_API_KEY; //Mabox Setup Token

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
          setData(data);
          console.log(data);
          if (data.error) {
            setIsEmptyData(true);
          }
          if (data.data.length < recordLimit) {
            setMoreRecords(false);
          } else {
            setMoreRecords(true);
          }
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

      // Call the API every X seconds
      const interval = setInterval(fetchData, DASHBOARD_FETCH_INTERVAL * 1000); // replace X with your interval in seconds

      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    } else {
      window.location.assign("/login");
    }
  }, [recordLimit]);

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
          <section className="h-full relative">
            {isEmptyData && <h4>No data to display</h4>}

            {!isEmptyData && (
              <>
                <Sheet
                  name="tool-bar"
                  sx={{
                    position: "absolute",
                    right: 0,
                    margin: 4,
                    padding: 1,
                    width: 125,
                    borderRadius: 4,
                    opacity: 0.75,
                    boxShadow: "black 2px 2px 12px",
                  }}
                >
                  <table className="w-full fade-in">
                    <thead>
                      <th className="text-left">Tool</th>
                      <th></th>
                    </thead>
                    <tbody>
                      <tr className="border-b flex justify-between items-center">
                        <td className="text-[.75em]">Top Locations</td>
                        <td>
                          <input
                            type={"checkbox"}
                            checked={topLocationsWidgetOpen}
                            onClick={() => {
                              setTopLocationsWidgetOpen(
                                !topLocationsWidgetOpen
                              );
                            }}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Sheet>
                <div className="absolute m-4 fade-in">
                  <div className="flex flex-col gap-4">
                    {topLocationsWidgetOpen && (
                      <Sheet
                        name="city-country"
                        sx={{
                          padding: 1,
                          width: 200,
                          borderRadius: 4,
                          opacity: 0.75,
                          boxShadow: "black 2px 2px 12px",
                        }}
                      >
                        <Typography sx={{ fontWeight: 700 }}>
                          Top Clickers
                        </Typography>
                        <div className="flex items-center gap-1">
                          Country:{" "}
                          <Tooltip title="United States" placement="right">
                            <span className="drop-shadow text-[1.5em]">🇺🇸</span>
                          </Tooltip>
                        </div>
                        <div>City: {data.topCities[0].city}</div>
                      </Sheet>
                    )}
                    <Sheet
                      name="timeframe"
                      sx={{
                        padding: 1,
                        width: 200,
                        borderRadius: 4,
                        opacity: 0.75,
                        boxShadow: "black 2px 2px 12px",
                      }}
                    >
                      <Typography sx={{ fontWeight: 700 }}>
                        Timeframe
                      </Typography>
                      <div className="flex items-center gap-1">
                        <input type="range"></input>
                      </div>
                      <div>City: {data.topCities[0].city}</div>
                    </Sheet>
                  </div>
                </div>

                <Map records={data.data}></Map>
              </>
            )}
          </section>
        </>
      )}
    </main>
  );
}

const Map = ({ records }) => {
  const coordinates = [];
  records.map((record) => {
    coordinates.push({
      lng: record.location.longitude,
      lat: record.location.latitude,
    });
  });
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/dark-v11", // style URL
      center: [-74.5, 40],
      zoom: 9,
      attributionControl: false,
    });

    // Add your heatmap layer here
    map.on("load", function () {
      map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: coordinates.map((coord) => ({
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [coord.lng, coord.lat],
            },
          })),
        },
      });

      map.addLayer({
        id: "heatmap",
        type: "heatmap",
        source: "points",
        maxzoom: 15,
        paint: {
          "heatmap-radius": {
            stops: [
              [0, 2],
              [5, 20],
            ],
          },
        },
      });
    });
    return () => map.remove();
  }, []);

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      className="flex justify-center "
    >
      <div
        id="map"
        style={{ height: "100%", width: "100%" }}
        className="overflow-hidden w-[90%]"
      />
    </div>
  );
};
