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

//Date Imports
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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
  const [dateRange, setDateRange] = useState(null);
  const [realDateRange, setRealDateRange] = useState(null);
  //The minimum and maximum dates are the first ever traffic record and the most recent respsectively
  // dateRange[0] Minimum
  // dateRange[1] Maximum

  // Widget States
  const [topLocationsWidgetOpen, setTopLocationsWidgetOpen] = useState(true);
  const [timeframeWidgetOpen, setTimeframeWidgetOpen] = useState(true);

  mapboxgl.accessToken = MAPBOX_API_KEY; //Mabox Setup Token

  async function assignUser() {
    const userData = getUser(); // Fetch user data
    setUser(userData); // Set user data to state
    return userData; // Return the user data
  }

  useEffect(() => {
    console.log(dateRange);
  }, [dateRange]);
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
          setRealDateRange([
            data.data[data.data.length - 1].createdAt,
            data.data[0].createdAt,
          ]);
          setDateRange([
            data.data[data.data.length - 1].createdAt,
            data.data[0].createdAt,
          ]);
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

      // // Call the API every X seconds
      // const interval = setInterval(fetchData, DASHBOARD_FETCH_INTERVAL * 1000); // replace X with your interval in seconds

      // Clean up the interval on component unmount
      //return () => clearInterval(interval);
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
                    bottom: 0,
                    margin: 4,
                    padding: 1,
                    width: 125,
                    borderRadius: 4,
                    opacity: 0.75,
                    boxShadow: "black 2px 2px 12px",
                  }}
                >
                  <table className="w-full fade-in">
                    <div className="flex justify-between items-center">
                      <thead>
                        <th className="text-left">Tool</th>
                      </thead>
                      {/*TODO: Create a "Toggle All" checkbox here*/}
                    </div>
                    <tbody>
                      <tr className="border-b flex justify-between items-center">
                        <td className="text-[.75em]">Date Range</td>
                        <td>
                          <input
                            type={"checkbox"}
                            checked={timeframeWidgetOpen}
                            onClick={() => {
                              setTimeframeWidgetOpen(!timeframeWidgetOpen);
                            }}
                          ></input>
                        </td>
                      </tr>
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
                    {timeframeWidgetOpen && (
                      <Sheet
                        name="timeframe"
                        sx={{
                          padding: 1,
                          width: 350,
                          borderRadius: 4,
                          opacity: 0.75,
                          boxShadow: "black 2px 2px 12px",
                        }}
                      >
                        <div className="flex items-center justify-center gap-1 pt-2">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Starting From"
                              defaultValue={dayjs(realDateRange[0])}
                              minDate={dayjs(realDateRange[0])}
                              maxDate={dayjs(dateRange[1])}
                              onChange={(newValue) => {
                                setDateRange([newValue, dateRange[1]]);
                              }}
                            ></DatePicker>
                            <DatePicker
                              label="To"
                              defaultValue={dayjs(realDateRange[1])}
                              disableFuture
                              minDate={dayjs(dateRange[0])}
                              maxDate={dayjs()}
                              onChange={(newValue) => {
                                setDateRange([dateRange[0], newValue]);
                              }}
                            ></DatePicker>
                          </LocalizationProvider>
                        </div>
                      </Sheet>
                    )}
                    {topLocationsWidgetOpen && (
                      <Sheet
                        name="city-country"
                        sx={{
                          padding: 1,
                          width: 250,
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
                        <div>City: {data.topCities[0].city}</div> {/*TODO: Calculate top city from dateRange*/}
                        
                      </Sheet>
                    )}
                  </div>
                </div>

                <Map
                  records={data.data.filter((record) => {
                    var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
                    var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
                    dayjs.extend(isSameOrAfter);
                    dayjs.extend(isSameOrBefore);
                    const recordDate = dayjs(record.createdAt); // assuming record.createdAt is the date you want to compare
                    const startDate = dayjs(dateRange[0]);
                    const endDate = dayjs(dateRange[1]);
                    return (
                      recordDate.isSameOrAfter(startDate) &&
                      recordDate.isSameOrBefore(endDate)
                    );
                  })}
                  dateRange={dateRange}
                ></Map>
              </>
            )}
          </section>
        </>
      )}
    </main>
  );
}

const Map = ({ records, dateRange }) => {
  const [mapCenter, setMapCenter] = useState([-74.5, 40]); // Default center
  const [mapZoom, setMapZoom] = useState(9); // Default zoom

  const coordinates = [];
  records.map((record) => {
    coordinates.push({
      lng: record.location.longitude,
      lat: record.location.latitude,
    });
  });
  console.log(coordinates);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/dark-v11", // style URL
      center: [-74.5, 40],
      zoom: 9,
      attributionControl: false,
    });
    
    map.on('move', () => {
      setMapCenter([map.getCenter().lng, map.getCenter().lat]);
      setMapZoom(map.getZoom());
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
  }, [dateRange]);

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
