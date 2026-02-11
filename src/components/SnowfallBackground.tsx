"use client";

import React from "react";
import Snowfall from "react-snowfall";

interface SnowfallProps {
  color?: string;
  snowflakeCount?: number;
}

export default function SnowfallBackground({
  color = "#dee4fd",
  snowflakeCount = 200,
}: SnowfallProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <Snowfall color={color} snowflakeCount={snowflakeCount} />
    </div>
  );
}
