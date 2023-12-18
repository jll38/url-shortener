import React, { useState } from "react";
import { RadialChart, Hint } from "react-vis";
import { Motion, spring } from "react-motion";

export function PieChart({ value }) {
  const [hoveredCell, setHoveredCell] = useState(false);

  return (
    <RadialChart
      animation={{ damping: 10, stiffness: 20 }}
      data={value.map((i) => {
        return {
          angle: i.count,
          label: i.label,
          count: i.count,
        };
      })}
      width={200}
      height={200}
      onValueMouseOver={(v) => setHoveredCell(v)}
      onValueMouseOut={() => setHoveredCell(false)}
    >
      {hoveredCell && (
        <Hint value={hoveredCell} style={{position: "absolute"}}>
          <div
            style={{
              background: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {hoveredCell.label}: {hoveredCell.count}
          </div>
        </Hint>
      )}
    </RadialChart>
  );
}
