"use client";
import { AreaLine } from "./../../components/dashboard/graphing/AreaLine";

import { Table, Sheet, Typography, Skeleton, Select, Option } from "@mui/joy";

import { CircularProgress } from "@mui/joy";

import { getUser } from "@/lib/authHandlers";
import { getDate } from "@/lib/time";
import { ENVIRONMENT } from "@/lib/constants";
import { useState, useEffect } from "react";
import Link from "next/link";

//Visualization Imports
import {
  XYPlot,
  LineMarkSeries,
  XAxis,
  VerticalGridLines,
  VerticalBarSeries,
  AreaSeries,
  RadialChart,
} from "react-vis";
//Icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ArrowDropUp, MouseTwoTone } from "@mui/icons-material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DevicesIcon from "@mui/icons-material/Devices";

import { headers } from "next/dist/client/components/headers";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [recordLimit, setRecordLimit] = useState(10);
  const [moreRecords, setMoreRecords] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Data States
  const [topPerformers, setTopPerformers] = useState(null);
  const [dailyClicks, setDailyClicks] = useState(null);
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
            console.log(info);
            setTopPerformers(info.data.topPerformers);
            setDailyClicks(info.data.dailyClicks);
            setDevices(
              info.data.deviceAndBrowser.deviceCountArray.map((item) => {
                return { device: item.device, count: item.count };
              })
            );
            setBrowsers(
              info.data.deviceAndBrowser.browserCountArray.map(
                (item) => { return { browser: item.browser, count: item.count };}
              )
            );
            setReferrers(info.data.referrers);
          });
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="w-full h-full flex flex-col gap-8 max-h-screen overflow-y-scroll">
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
          <div className="px-4 flex flex-wrap gap-8">
            <Sheet
              sx={{
                minWidth: "500px",
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
              <Sheet className="h-[85%] ">
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
                              <Link
                                href={performer.originalURL}
                                target="_blank"
                              >
                                {performer.originalURL}
                              </Link>
                            </td>
                            <td>{performer.clicks}</td>
                            <td>
                              <ArrowDropDownIcon style={{ fill: "red" }} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </Table>
              </Sheet>
            </Sheet>
            <Sheet
              sx={{
                minWidth: "400px",
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
                <AreaLine />
              </div>
            </Sheet>
            <div>
              <br /> Most popular referrers.
              <br />
              Total clicks by device type (mobile vs. desktop).
              <br /> Pie chart of click distribution by operating system.
              <br />
              Top 5 URLs with the highest growth in clicks.
            </div>
          </div>
          <div className="px-4 flex flex-wrap gap-8">
            <Sheet
              sx={{
                minWidth: "400px",
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
              <div className="w-full h-full flex justify-center">
                <XYPlot height={200} width={400}>
                  <VerticalGridLines />
                  <VerticalBarSeries
                    data={[
                      { x: 0, y: 0 },
                      { x: 1, y: 5 },
                      { x: 2, y: 4 },
                      { x: 3, y: 9 },
                      { x: 4, y: 1 },
                      { x: 5, y: 7 },
                      { x: 6, y: 6 },
                      { x: 7, y: 3 },
                      { x: 8, y: 2 },
                      { x: 9, y: 0 },
                    ]}
                    style={{ fill: "none" }}
                  />
                </XYPlot>
              </div>
            </Sheet>
            <Sheet
              sx={{
                minWidth: "500px",
                height: "310px",
                boxShadow: 3,
                padding: "16px",
              }}
              className={"rounded-[1.5rem] shadow-lg flex-0"}
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
                      <RadialChart
                        data={devices.map((device) => {
                          return { angle: device.count };
                        })}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div>
                      <Typography>Browser</Typography>
                      <RadialChart
                        data={browsers.map((browser) => {
                          return { angle: browser.count };
                        })}
                        width={200}
                        height={200}
                      />
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
