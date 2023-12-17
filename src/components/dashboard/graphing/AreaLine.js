"use client";
import React, { useState, useEffect } from "react";
import { XYPlot, VerticalGridLines, AreaSeries } from "react-vis";
import { Crosshair } from "react-vis";
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
      className="border relative"
    >
      <VerticalGridLines />
      <AreaSeries
        padding={0}
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
            className="flex h-full"
            style={{
              position: "absolute",
              top: "0",
              left: `${10 * points[0].x}%`,
            }}
          >
            <div
              style={{
                background: "black",
                width: "2px",
                height: "80%",
              }}
            ></div>
            <div>
              {points[0].x},{points[0].y}{" "}
            </div>
          </div>
        </Crosshair>
      )}
    </XYPlot>
  );
}
