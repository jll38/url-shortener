"use client";
import React, { useState } from "react";
import { Tooltip } from "@mui/joy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CopyClipboard({ value = " " }) {
  const [toolTipText, setToolTipText] = useState("Copy to Clipboard");
  const [toolTipOpen, setToolTipOpen] = useState(false);
  function copyToClipboard() {
    navigator.clipboard.writeText(value);
    setToolTipText("Copied!");
  }

  return (
    <Tooltip
      title={toolTipText}
      open={toolTipOpen}
      onMouseEnter={() => {
        setToolTipOpen(true);
      }}
      onMouseLeave={() => {
        setToolTipText("Copy to Clipboard");
        setToolTipOpen(false);
      }}
    >
      <button
        className="p-1 hover:bg-gray-100 rounded-lg"
        onClick={copyToClipboard}
      >
        <ContentCopyIcon style={{ color: "black", fontSize: "18px" }} />
      </button>
    </Tooltip>
  );
}
