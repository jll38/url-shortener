"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Sheet, Button, Typography, Skeleton } from "@mui/joy";
import {
  Dashboard,
  BarChart,
  Public,
  Link,
  ExitToApp,
} from "@mui/icons-material";
import Groups3Icon from "@mui/icons-material/Groups3";

import { getUser } from "@/lib/authHandlers";
export default function DashNav() {
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  const dashPages = [
    { name: "Overview", route: "/dashboard", icon: <Dashboard />, disabled: false },
    { name: "Analytics", route: "/dashboard/analytics", icon: <BarChart />, disabled: true },
    { name: "Geography", route: "/dashboard/geography", icon: <Public />, disabled: false},
    {
      name: "Demographics",
      route: "/dashboard/demographics",
      icon: <Groups3Icon />,
      disabled: true,
    },
    { name: "My Links", route: "/dashboard/links", icon: <Link />, disabled: false,},
  ];

  useEffect(() => {
    setUser(getUser());
  }, []);
  return (
    <nav className="h-screen lg:w-[15rem] md:w-[10rem] border-r-2 z-50 sm:flex hidden overflow-y-scroll transition-all duration-200">
      <Sheet
        sx={{ width: "100%", height: "100%" }}
        className={"flex flex-col justify-between"}
      >
        <Sheet sx={{ width: "100%" }}>
          <div className="w-full h-[80px] flex flex-col items-center justify-center">
            <i className="fa-solid fa-link"></i> TinyClicks
            <Typography sx={{fontSize: "70%"}}>Dashboard</Typography>
          </div>
          {dashPages.map((panel, i) => {
            return (
              <button
                key={`panel-${i}`}
                className={`w-full lg:h-[50px] px-[20%] ${
                  pathname === panel.route
                    ? "bg-slate-200"
                    : "hover:bg-slate-100"
                } lg:text-left text-center flex lg:flex-row flex-col lg:gap-1 items-center justify-center h-[80px] ${panel.disabled ? 'opacity-50' : ''}`}
                onClick={() => {
                  window.location.assign(panel.route);
                }}
                disabled={panel.disabled}
              >
                {panel.icon} {panel.name}
              </button>
            );
          })}
        </Sheet>
        <button
          className="lg:text-left text-center flex lg:flex-row flex-col lg:gap-1 items-center justify-center h-[80px] w-full lg:h-[50px] px-[20%] hover:bg-slate-100"
          onClick={() => {
            window.location.assign("/");
          }}
        >
          <ExitToApp />
          Exit
        </button>
      </Sheet>
    </nav>
  );
}
