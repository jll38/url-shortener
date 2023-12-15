"use client";
import { Table, Sheet, Typography, Skeleton } from "@mui/joy";

import mapboxgl from "mapbox-gl";
import Link from "next/link";
import { CircularProgress } from "@mui/joy";

import { getUser } from "@/lib/authHandlers";
import { useState, useEffect } from "react";
import { DASHBOARD_FETCH_INTERVAL, MAPBOX_API_KEY } from "@/lib/constants";

//Icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ArrowDropUp } from "@mui/icons-material";
import { headers } from "next/dist/client/components/headers";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [recordLimit, setRecordLimit] = useState(10);
  const [moreRecords, setMoreRecords] = useState(true);
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
      console.log(assignedUser);
      console.log("test");
      if (assignedUser) {
        console.log("test");
        console.log(assignedUser);

        fetch("/api/dash/overview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: assignedUser.id,
            operation: "top-performers",
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
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center border">
          <CircularProgress size="lg" />
        </div>
      ) : (
        <>
          <div className="h-[100px] p-4 flex gap-2 items-center">
            {user ? (
              <>
                <div>
                  <Typography sx={{ fontWeight: 700 }} className={"text-[2em]"}>
                    Welcome, {user.name}!
                  </Typography>
                  <Typography className={"text-[.8em]"}>
                    Let&apos;s see how your links are doing.
                  </Typography>
                </div>
                <div className="text-[2em]">👋🏻</div>
              </>
            ) : (
              <div className="mb-10">
                <Skeleton width={230} height={24} />
                <Skeleton width={200} height={12} className={"mt-[35px]"} />
              </div>
            )}
          </div>
          <div className="h-[320px] px-4 flex">
            <Sheet
              sx={{
                width: "400px",
                height: "100%",
                boxShadow: 3,
                padding: "16px",
              }}
              className={"rounded-[1.5rem] shadow-lg"}
            >
              <Typography
                sx={{ fontSize: "1.5em" }}
                className="flex items-center gap-2"
              >
                <EmojiEventsIcon /> Top Performers
              </Typography>
              <Sheet className="h-[85%]">
                <Table
                  sx={{
                    "& thead th:nth-child(1)": { width: "10%" },
                    "& thead th:nth-child(2)": { width: "30%" },
                    "& thead th:nth-child(3)": { width: "35%" },
                    "& thead th:nth-child(5)": { width: "10%" },
                    "& tbody th": { borderRight: "2px solid gray" },
                    "& tbody tr:nth-child(2)": {
                      bgcolor: "var(--joy-palette-neutral-100, #F0F4F8)",
                    },
                    "& tbody tr:nth-child(4)": {
                      bgcolor: "var(--joy-palette-neutral-100, #F0F4F8)",
                    },
                    "& thead th:nth-child(2)": { width: "30%" },
                    "& tr ": { height: "20px", fontSize: ".9em" },
                  }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Destination</th>
                      <th>Clicks</th>
                      <th></th>
                    </tr>
                  </thead>
                  {data && (
                    <tbody>
                      {data.data.map((performer, i) => {
                        return (
                          <tr key={"row-" + i}>
                            <td>{i + 1}</td>
                            <td>{performer.shortURL}</td>
                            <td>{performer.originalURL}</td>
                            <td>{performer.clicks}</td>
                            <td>
                              <ArrowDropDownIcon style={{ fill: "red" }} />
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td>2</td>
                        <td>
                          <Link href={`/dashboard/links/`}>Test</Link>
                        </td>
                        <td>Test</td>
                        <td>20</td>
                        <td>
                          <ArrowDropDownIcon style={{ fill: "red" }} />
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          <Link href={`/dashboard/links/`}>Test</Link>
                        </td>
                        <td>Test</td>
                        <td>20</td>
                        <td>
                          <ArrowDropUpIcon style={{ fill: "green" }} />
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>
                          <Link href={`/dashboard/links/`}>Test</Link>
                        </td>
                        <td>Test</td>
                        <td>20</td>
                        <td>
                          <ArrowDropUpIcon style={{ fill: "green" }} />
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>
                          <Link href={`/dashboard/links/`}>Test</Link>
                        </td>
                        <td>Test</td>
                        <td>20</td>
                        <td>
                          <ArrowDropDownIcon style={{ fill: "red" }} />
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </Sheet>
            </Sheet>
          </div>
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
    console.log(coordinates);
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
    <div style={{ height: "500px" }} className="flex justify-center ">
      <div
        id="map"
        style={{ height: "100%" }}
        className="rounded-[2rem] overflow-hidden w-[90%] sm:w-[75%]"
      />
    </div>
  );
};
