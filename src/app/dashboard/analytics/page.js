"use client";
import React from "react";

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
export default function Analytics() {
  const [data, setData] = useState(null);
  const [recordLimit, setRecordLimit] = useState(10);
  const [moreRecords, setMoreRecords] = useState(true);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    setUser(getUser());
  });
  return (
    <main className="h-screen overflow-x-hidden w-full">
      <div>
        Click-through rates for individual URLs.
        <br />
        Average time spent after clicking each URL (if trackable).
        <br />
        Graph of click trends over time for selected URLs.
        <br />
        Most clicked URLs in the last 24 hours.
        <br />
        Comparative bar chart of clicks per URL category or tag.
        <br />
        Conversion rates (if there&apos;s a way to track conversions after the
        click).
        <br /> Number of unique visitors vs. returning visitors.
        <br /> Percentage of clicks from organic vs. paid sources.
      </div>
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
    <div style={{ height: "500px" }} className="flex justify-center ">
      <div
        id="map"
        style={{ height: "100%" }}
        className="rounded-[2rem] overflow-hidden w-[90%] sm:w-[75%]"
      />
    </div>
  );
};
