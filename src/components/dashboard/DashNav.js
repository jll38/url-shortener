"use client";
import React from "react";
import { usePathname } from "next/navigation";

import { Sheet, Button, Typography } from "@mui/joy";
import { Dashboard, BarChart, Public, Link } from "@mui/icons-material";
import Groups3Icon from "@mui/icons-material/Groups3";
export default function DashNav() {
  const pathname = usePathname();

  const dashPages = [
    { name: "Overview", route: "/dashboard", icon: <Dashboard /> },
    { name: "Analytics", route: "/dashboard/analytics", icon: <BarChart /> },
    { name: "Geography", route: "/dashboard/geography", icon: <Public /> },
    {
      name: "Demographics",
      route: "/dashboard/demographics",
      icon: <Groups3Icon />,
    },
    { name: "My Links", route: "/dashboard/links", icon: <Link /> },
  ];
  return (
    <nav className="h-screen lg:w-[15rem] md:w-[10rem] border-r-2  ">
      <Sheet sx={{ width: "100%", height: "100%" }} className={"flex flex-col"}>
        <Typography className="w-full h-[80px] flex flex-col items-center justify-center">
          <i className="fa-solid fa-link"></i> TinyClicks
          <Typography className={"text-[70%]"}>Dashboard</Typography>
        </Typography>
        {dashPages.map((panel, i) => {
          return (
            <button
              key={`panel-${i}`}
              className={`w-full lg:h-[50px] px-[20%] ${
                pathname === panel.route ? "bg-slate-200" : "hover:bg-slate-100"} lg:text-left text-center flex lg:flex-row flex-col lg:gap-1 items-center justify-center h-[80px]`}
            >
              {panel.icon} {panel.name}
            </button>
          );
        })}
      </Sheet>
    </nav>
  );
}
