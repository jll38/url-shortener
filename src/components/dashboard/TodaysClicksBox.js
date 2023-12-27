import React, { useState, useEffect } from "react";
import { Sheet, Typography } from "@mui/joy";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import CountUp from "react-countup";

export function TodaysClicksBox({ todaysClicks, yesterdaysClicks }) {
  const ArrowIcon =
    yesterdaysClicks > todaysClicks ? (
      <ArrowDropDown style={{ fill: "red", fontSize: "2em" }} size="lg" />
    ) : (
      <ArrowDropUp size="lg" style={{ fill: "green", fontSize: "2em" }} />
    );
  return (
    <Sheet
      sx={{
        minWidth: "300px",
        height: "100px",
        boxShadow: 3,
        padding: "16px",
        bgcolor: "rgba(8, 145, 178, 0.5)",
      }}
      className={"shadow-lg flex flex-col items-center"}
    >
      <Typography
        sx={{
          fontSize: "1.5em",
          lineHeight: ".8em",
          color: "rgba(255, 255, 255, 0.8)",
          fontWeight: 700,
        }}
      >
        Today&apos;s Clicks
      </Typography>
      <div className="flex items-center">
        <Typography
          sx={{
            fontSize: "2em",
            marginLeft: "2rem",
            lineHeight: "1.25em",
            color: "rgba(255, 255, 255, 0.8)",
            fontWeight: 900,
          }}
        >
          <CountUp start={0} end={todaysClicks} duration={1.5}></CountUp>
        </Typography>
        {ArrowIcon}
      </div>
      <Typography
        sx={{
          fontSize: ".8em",
          lineHeight: ".8em",
          color: "rgba(255, 255, 255, 0.8)",
          fontWeight: 500,
        }}

      >
        {yesterdaysClicks} Yesterday
      </Typography>
    </Sheet>
  );
}
