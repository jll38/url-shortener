"use client";
import React from 'react'
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

export default function Geography() {
  const [data, setData] = useState(null);
  const [recordLimit, setRecordLimit] = useState(10);
  const [moreRecords, setMoreRecords] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getUser());
    if (user) setLoading(false);
  });

  return (
    <main className="w-full h-full">
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center border">
        <CircularProgress size="lg"/>
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
                  <tbody>
                    <tr>
                      <td>1</td>
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
                </Table>
              </Sheet>
            </Sheet>
          </div>
        </>
      )}
    </main>
  );
}
