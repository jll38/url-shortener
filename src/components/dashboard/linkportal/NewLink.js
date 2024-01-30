"use client";
import React from "react";
import { Sheet, Input, Typography, Button } from "@mui/joy";
import Image from "next/image";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";

import { Check } from "@mui/icons-material";
import { TruncateText } from "@/lib/general-helpers";

export function NewLink({ open, setOpen, unsavedChanges, setUnsavedChanges }) {
  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [imageLink, setImageLink] = React.useState(null);
  const [link, setLink] = React.useState(null);

  const [openAnim, setOpenAnim] = React.useState(false);

  React.useEffect(() => {
    //Converts file to a readable format for <Image/>
    if (image) {
      const object = URL.createObjectURL(image);
      setImageLink(object);
    }
  }, [image]);

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      handleClose();
    }
    if (event.key === "Enter") {
      addLink();
    }
  };

  React.useEffect(() => {
    // Adding the keypress event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setOpenAnim(true);
    }, 100);
  }, [open]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleClose = () => {
    setOpenAnim(false);
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };
  const addLink = () => {
    if (unsavedChanges.length >= 0) {
      setUnsavedChanges([
        ...unsavedChanges,
        {
          name: name,
          description: description,
          type: "link",
          image: image,
          link: link,
          action: "add",
        },
      ]);
    } else {
      setUnsavedChanges([
        {
          name: name,
          description: description,
          type: "link",
          image: image,
          link: link,
          action: "add",
        },
      ]);
    }
    setOpen(false);
  };

  return (
    <div className="relative flex w-full justify-center">
      <Sheet
        className={`absolute w-[30%] border ${
          openAnim ? "left-0" : "-left-[35%]"
        } p-4 flex flex-col gap-4 transition-all duration-150 drop-shadow-lg rounded-xl`}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 24 }}>
          Portal Creator
        </Typography>
        <div className="flex gap-2">
          <span className="text-red-700">*</span>
          <Input
            onChange={(e) => {
              setName(e.target.value);
            }}
            variant="soft"
            placeholder="Title"
            required
          ></Input>
        </div>
        <div className="flex gap-2">
          <span className="text-transparent">*</span>
          <Input
            variant="soft"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Description"
          ></Input>
        </div>
        <div className="flex gap-2">
          <span className="text-red-700">*</span>
          <Input
            variant="soft"
            onChange={(e) => {
              setLink("https://" + e.target.value);
            }}
            startDecorator="https://"
            placeholder="example.com"
            required
          ></Input>
        </div>
        <input
          variant="plain"
          onChange={handleFileChange}
          placeholder="Description"
          type={"file"}
          accept="image/*"
        ></input>
        <div className="flex gap-2">
          <button
            className="py-2 px-4 bg-[#0891b280] hover:bg-cyan-500 transition-colors duration-150 text-white rounded-lg"
            onClick={addLink}
          >
            Create
          </button>
          <button
            className="py-2 px-4 bg-[#b2082780] hover:bg-[#5d1515b5] transition-colors duration-150 text-white rounded-lg"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </Sheet>
      <Sheet
        sx={{
          width: "400px",
          height: "100px",
          overflow: "hidden",
          borderRadius: "20px",
        }}
        className={`drop-shadow-md transition-colors duration-200`}
      >
        <div target="_blank" className="">
          <div className="w-[400px] h-[100px] flex justify-start items-center px-10 gap-[40px]">
            <div className={`${imageLink ? '' : 'bg-gray-300'} w-[75px] h-[75px] relative overflow-hidden rounded-md grid place-items-center drop-shadow`}>
              {imageLink ? (
                <Image src={imageLink} fill className="object-cover"></Image>
              ) : (
                <CameraAltRoundedIcon />
              )}
            </div>
            <div>
              <div className="font-semibold">{name || " "}</div>
              <div className="text-slate-400">
                {TruncateText(description, 24) || " "}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
