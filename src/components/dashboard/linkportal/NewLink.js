"use client";
import React from "react";
import { Sheet, Input } from "@mui/joy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from '@mui/icons-material/Check';
import Close from "@mui/icons-material/Close";

import { Check } from "@mui/icons-material";

export function NewLink({ setOpen }) {
  const [name, setName] = React.useState(null);
  const [link, setLink] = React.useState(null);

  React.useEffect(() => {
    if (name && link) {
      setOpen(false);
    }
  }, [name, link]);
  return (
    <Sheet
      sx={{
        width: "400px",
        height: "100px",
        overflow: "hidden",
        borderRadius: "20px",
      }}
      className="drop-shadow-md transition-colors duration-200"
    >
      <div target="_blank" className="">
        <div className="w-[400px] h-[100px] grid place-items-center">
          {!name && (
            <div className="flex">
              {" "}
              <button
                className="px-2 bg-[#0891b280] hover:bg-cyan-500 text-white rounded-lg"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Close />
              </button>
              <Input type="text" id="nameInput" placeholder="Title"></Input>
              <button
                className="px-2 bg-[#0891b280] hover:bg-cyan-500 text-white rounded-lg"
                onClick={() => {
                  setName(document.getElementById("nameInput").value);
                }}
              >
                <ArrowForwardIcon />
              </button>
            </div>
          )}
          {name && (
            <div className="flex">
              <button
                className="px-2 bg-[#0891b280] hover:bg-cyan-500 text-white rounded-lg"
                onClick={() => {
                  setName(null);
                }}
              >
                <ArrowBackIcon />
              </button>

              <Input
                type="text"
                id="linkInput"
                placeholder="example.com"
                startDecorator="http://"
              ></Input>
              <div className="flex gap-10">
                <button
                  className="px-2 bg-[#0891b280] hover:bg-cyan-500 text-white rounded-lg"
                  onClick={() => {
                    setLink(document.getElementById("linkInput").value);
                  }}
                >
                  <CheckIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Sheet>
  );
}
