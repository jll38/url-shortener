"use client";
import { TodaysClicksBox } from "./../../components/dashboard/TodaysClicksBox";

import { TopPerformers } from "./../../components/dashboard/graphing/TopPerformers";
import { PieChart } from "./../../components/dashboard/graphing/PieChart";
import { AreaLine } from "./../../components/dashboard/graphing/AreaLine";

import { Table, Sheet, Typography, Skeleton, Select, Option } from "@mui/joy";
import CountUp from "react-countup";

import { CircularProgress } from "@mui/joy";

import { TIME_ZONE } from "@/lib/constants";
import { getUser } from "@/lib/authHandlers";
import { getDate } from "@/lib/time";
import { ENVIRONMENT } from "@/lib/constants";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
//Visualization Imports
import {
  XYPlot,
  LineMarkSeries,
  XAxis,
  VerticalGridLines,
  VerticalBarSeries,
  AreaSeries,
  RadialChart,
  Hint,
} from "react-vis";
//Icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { ArrowDropUp, MouseTwoTone } from "@mui/icons-material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DevicesIcon from "@mui/icons-material/Devices";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

import { headers } from "next/dist/client/components/headers";
import { color } from "framer-motion";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [recordLimit, setRecordLimit] = useState(10);
  const [moreRecords, setMoreRecords] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState(null);

  //Data States
  const [topPerformers, setTopPerformers] = useState(null);
  const [dailyClicks, setDailyClicks] = useState(null);
  const [todaysClicks, setTodaysClicks] = useState(null);
  const [devices, setDevices] = useState(null);
  const [browsers, setBrowsers] = useState(null);
  const [referrers, setReferrers] = useState(null);

  async function assignUser() {
    const userData = getUser(); // Fetch user data
    setUser(userData); // Set user data to state
    return userData; // Return the user data
  }
  useEffect(() => {
    async function fetchData() {
      const assignedUser = await assignUser();
      if (assignedUser) {
        fetch("/api/dash/overview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: assignedUser.id,
            operation: "top-performers",
            timeZone: TIME_ZONE,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((info) => {
            setData(info);
            setTopPerformers(info.data.topPerformers);
            setDailyClicks(info.data.dailyClicks);
            setTodaysClicks(info.data.todaysClicks);

            setDevices(
              info.data.deviceAndBrowser.deviceCountArray.map((item) => {
                return { label: item.device, count: item.count };
              })
            );
            setBrowsers(
              info.data.deviceAndBrowser.browserCountArray.map((item) => {
                return { label: item.browser, count: item.count };
              })
            );
            setReferrers(info.data.referrers);
          })
          .finally((done) => {
            setLoading(false);
          });
      }
    }
    fetchData();
  }, []);

  return (
    <main className="w-full h-full flex flex-col gap-8 max-h-screen overflow-y-scroll">
      {loading && !topPerformers && !dailyClicks && !devices && !browsers ? (
        <div className="w-full h-screen flex justify-center items-center border">
          <CircularProgress size="lg" />
        </div>
      ) : (
        <>
          <div className="h-[150px] p-4 flex gap-2 items-center">
            {user ? (
              <div className="flex items-center gap-8">
                <Image
                  src={"/images/dash-user-greeting.png"}
                  width={150}
                  height={150}
                  draggable={"false"}
                  alt="/"
                ></Image>
                <div>
                  <Typography sx={{ fontWeight: 700 }} className={"text-[2em]"}>
                    Hello, {user.name}!
                  </Typography>
                  <Typography className={"text-[.8em]"}>
                    Welcome to your dashboard.
                  </Typography>
                </div>
              </div>
            ) : (
              <div className="mb-10">
                <Skeleton width={230} height={24} />
                <Skeleton width={200} height={12} className={"mt-[35px]"} />
              </div>
            )}
          </div>
          <div className="px-4 flex flex-wrap gap-8">
            {dailyClicks && (
              <TodaysClicksBox
                todaysClicks={todaysClicks}
                yesterdaysClicks={dailyClicks[dailyClicks.length - 1].clicks}
              />
            )}
          </div>
          <div className="px-4 flex flex-wrap gap-8">
            {topPerformers && (
              <Sheet
                sx={{
                  minWidth: "350px",
                  height: "100%",
                  boxShadow: 3,
                  padding: "16px",
                }}
                className={"rounded-[1.5rem] shadow-lg flex-1"}
              >
                <Typography
                  sx={{ fontSize: "1.5em" }}
                  className="flex items-center gap-2"
                >
                  <EmojiEventsIcon /> Top Performers
                </Typography>
                <TopPerformers topPerformers={topPerformers} />
              </Sheet>
            )}
            <Sheet
              sx={{
                minWidth: "350px",
                height: "310px",
                boxShadow: 3,
                padding: "16px",
              }}
              className={"rounded-[1.5rem] shadow-lg flex-1"}
            >
              <Typography
                sx={{ fontSize: "1.5em" }}
                className="flex items-center gap-2"
              >
                <MouseTwoTone /> Click Metrics
              </Typography>
              <Select
                defaultValue="daily"
                variant="plain"
                sx={{ width: "120px" }}
              >
                <Option value={"daily"}>Daily</Option>
                <Option value={"weekly"}>Weekly</Option>
                <Option value={"monthly"}>Monthly</Option>
              </Select>{" "}
              <div className="w-full h-full flex justify-center">
                {dailyClicks && (
                  <AreaLine
                    dailyClicks={dailyClicks}
                    todaysClicks={todaysClicks}
                  />
                )}
              </div>
            </Sheet>
          </div>
          <div className="px-4 flex flex-wrap gap-8 transition-all duration-200">
            <Sheet
              sx={{
                minWidth: "350px",
                height: "310px",
                boxShadow: 3,
                padding: "16px",
              }}
              className={"rounded-[1.5rem] shadow-lg flex-1"}
            >
              <Typography
                sx={{ fontSize: "1.5em" }}
                className="flex items-center gap-2"
              >
                <CompareArrowsIcon /> Top Referrers
              </Typography>
              <Select
                defaultValue="daily"
                variant="plain"
                sx={{ width: "120px" }}
              >
                <Option value={"daily"}>Daily</Option>
                <Option value={"weekly"}>Weekly</Option>
                <Option value={"monthly"}>Monthly</Option>
                <Option value={"ytd"}>YTD</Option>
                <Option value={"all-time"}>All Time</Option>
              </Select>{" "}
              {referrers && (
                <div>
                  {referrers.map((ref, i) => {
                    return (
                      <div key={`ref-${i}`} className="flex gap-4">
                        <div>{ref.selectedData.title}</div>
                        <div>{ref.count}</div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="w-full h-full flex justify-center ">
                <XYPlot height={200} width={400}>
                  <VerticalGridLines />
                  <VerticalBarSeries
                    data={referrers.map((ref, i) => {
                      return {
                        x: i,
                        y: ref.count,
                        title: ref.selectedData.title,
                      };
                    })}
                    style={{ fill: "blue" }}
                    onValueMouseOver={(v) => setHoveredCell(v)}
                    onValueMouseOut={() => setHoveredCell(false)}
                  />
                  {hoveredCell && (
        <Hint value={hoveredCell} style={{ position: "absolute", color: "gray" }}>
          <div
            style={{
              background: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {hoveredCell.title} : {hoveredCell.y}
          </div>
        </Hint>
      )}
                </XYPlot>
              </div>
            </Sheet>
            <Sheet
              sx={{
                minWidth: "350px",
                height: "310px",
                boxShadow: 3,
                padding: "16px",
              }}
              className={"rounded-[1.5rem] shadow-lg flex-1"}
            >
              <Typography
                sx={{ fontSize: "1.5em" }}
                className="flex items-center gap-2"
              >
                <DevicesIcon /> Devices
              </Typography>
              <Select
                defaultValue="daily"
                variant="plain"
                sx={{ width: "120px" }}
              >
                <Option value={"daily"}>Daily</Option>
                <Option value={"weekly"}>Weekly</Option>
                <Option value={"monthly"}>Monthly</Option>
                <Option value={"ytd"}>YTD</Option>
                <Option value={"all-time"}>All Time</Option>
              </Select>{" "}
              <div className="w-full h-full flex justify-center text-center">
                {devices && browsers && (
                  <>
                    <div>
                      <Typography>Device</Typography>
                      <PieChart value={devices} />
                    </div>
                    <div>
                      <Typography>Browser</Typography>
                      <PieChart value={browsers} />
                    </div>
                  </>
                )}
              </div>
            </Sheet>
          </div>
        </>
      )}
    </main>
  );
}

function undefined({ topPerformers, performer, i, ENVIRONMENT }) {
  return (
    <Sheet className="h-[85%]">
      <Table
        sx={{
          "& thead th:nth-child(1)": {
            width: "10%",
          },
          "& thead th:nth-child(2)": {
            width: "30%",
          },
          "& thead th:nth-child(3)": {
            width: "35%",
          },
          "& thead th:nth-child(5)": {
            width: "10%",
          },
          "& tbody th": {
            borderRight: "2px solid gray",
          },
          "& tbody tr:nth-child(2)": {
            bgcolor: "var(--joy-palette-neutral-100, #F0F4F8)",
          },
          "& tbody tr:nth-child(4)": {
            bgcolor: "var(--joy-palette-neutral-100, #F0F4F8)",
          },
          "& thead th:nth-child(2)": {
            width: "30%",
          },
          "& tr ": {
            height: "20px",
            fontSize: ".9em",
          },
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
        {topPerformers && (
          <tbody>
            {topPerformers.map((performer, i) => {
              return (
                <tr key={"row-" + i}>
                  <td>{i + 1}</td>
                  <td>
                    {performer.name ||
                      (ENVIRONMENT === "dev"
                        ? performer.shortURL.slice(22)
                        : performer.shortURL.slice(21))}
                  </td>
                  <td>
                    <Link href={performer.originalURL} target="_blank">
                      {performer.originalURL}
                    </Link>
                  </td>
                  <td>{performer.clicks}</td>
                  <td>
                    <ArrowDropDown
                      style={{
                        fill: "red",
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </Table>
    </Sheet>
  );
}
