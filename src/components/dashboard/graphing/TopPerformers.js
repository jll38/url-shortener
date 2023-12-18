import React from "react";
import { Sheet, Table } from "@mui/joy";
import Link from "next/link";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CountUp from "react-countup"
import { ENVIRONMENT } from "@/lib/constants";

export function TopPerformers({ topPerformers }) {
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
                  <td><CountUp start={0} end={performer.clicks} duration={2}></CountUp></td>
                  <td>
                    <ArrowDropDownIcon
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
