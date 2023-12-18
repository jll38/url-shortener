"use client";
import React, { useState, useEffect } from "react";
import { XYPlot, VerticalGridLines, AreaSeries } from "react-vis";
import { Crosshair } from "react-vis";
import { Sheet } from "@mui/joy";
export function AreaLine({dailyClicks, todaysClicks}) {
  const [points, setPoints] = useState([]);
  let count = 0;
  const dataPoints = dailyClicks.map((record, i) => {
    count++;
    return {x: i, y: record.clicks}
  })
  dataPoints.push({x: count, y: todaysClicks});
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
        data={dataPoints}
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
