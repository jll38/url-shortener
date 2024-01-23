"use client";
import React from "react";
import { Sheet, Input, Typography, Button } from "@mui/joy";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";

import { Check } from "@mui/icons-material";

export function NewLink({ setOpen }) {
  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [link, setLink] = React.useState(null);

  React.useEffect(() => {
    if (name && link) {
      setOpen(false);
    }
  }, [name, link]);

  return (
    <div className="relative flex w-full justify-center">
      <Sheet className="absolute  w-[400px] border left-0 p-4 flex flex-col gap-4">
        <Typography sx={{ fontWeight: 500 }}>Portal Creator</Typography>
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          variant="soft"
          placeholder="Title"
        ></Input>
        <Input
          variant="soft"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Description"
        ></Input>
        <Input
          variant="soft"
          onChange={(e) => {
            setLink(e.target.value);
          }}
          startDecorator="https://"
          placeholder="example.com"
        ></Input>
        <input
          variant="plain"
          onChange={(e) => {
            setImage();
          }}
          placeholder="Description"
          type={"file"}
          accept="image/*"
        ></input>
        <button
          className="py-2 px-4 bg-[#0891b280] hover:bg-cyan-500 transition-colors duration-150 text-white rounded-lg"
          disabled={name !== null && link !== null}
          onClick={(e) => {alert("test")}}
        >
          Create
        </button>
      </Sheet>
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
          <div className="w-[400px] h-[100px] flex justify-start items-center px-10 gap-[75px]">
            <div>Image</div>
            <div>
              <div className="font-semibold">{name || " "}</div>
              <div className="text-slate-400">{description || " "}</div>
              <div></div>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
