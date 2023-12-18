"use client";
import React, { useState, useEffect } from "react";
import { XYPlot, VerticalGridLines, AreaSeries } from "react-vis";
import { Crosshair } from "react-vis";
import { Sheet } from "@mui/joy";
export function AreaLine({}) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    console.log("points " + typeof points);
  }, [points]);

  return (
    <XYPlot
      height={200}
      width={400}
      margin={{bottom: 0, left:10, top:0, right:10}}
      onMouseLeave={() => setPoints([])}
      className="relative"
    >

      <AreaSeries
        padding={0}
        style={{opacity: .5, fill: '#496a81'}}
        stroke='#2B3A67'
        data={[
          {
            x: 0,
            y: 0,
          },
          {
            x: 1,
            y: 5,
          },
          {
            x: 2,
            y: 4,
          },
          {
            x: 3,
            y: 9,
          },
          {
            x: 4,
            y: 1,
          },
          {
            x: 5,
            y: 7,
          },
          {
            x: 6,
            y: 6,
          },
          {
            x: 7,
            y: 3,
          },
          {
            x: 8,
            y: 2,
          },
          {
            x: 9,
            y: 0,
          },
        ]}
        onNearestX={(value) => {
          setPoints([value]);
        }}
      />
      {Object.keys(points).length > 0 && (
        <Crosshair values={points}>
          <div
            className="flex h-full w-[100px] "

          >
            <Sheet sx={{bgcolor: 'transparent'}} className="flex h-[40px] items-center justify-center ml-2">
              {points[0].y} Clicks
            </Sheet>
          </div>
        </Crosshair>
      )}
    </XYPlot>
  );
}
