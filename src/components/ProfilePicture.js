"use client";
import React from "react";
import Image from "next/image";

import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from '@mui/icons-material/Person';

export function ProfilePicture({
  editable = false,
  setNewProfilePicture = null,
  picture
}) {
  const [showEditButton, setShowEditButton] = React.useState(false);

  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewProfilePicture(file);
  };  

  return (
    <div
      className="h-[100px] w-[100px] grid place-items-center bg-gray-100 rounded-[10em] overflow-hidden relative"
      onMouseEnter={() => {
        if (editable) setShowEditButton(true);
      }}
      onMouseLeave={() => {
        if (editable) setShowEditButton(false);
      }}
    >
      {picture ? <Image
        src={picture}
        fill
        style={{ zIndex: 1 }}
        alt="profile picture"
      ></Image> : <PersonIcon sx={{fontSize: 36}}/> }
      {showEditButton && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
          <button
            className="w-full h-full hover:bg-gray-200/75 absolute top-0 left-0 flex justify-center items-center"
            onClick={handleButtonClick}
            style={{ zIndex: 2 }}
          >
            {setNewProfilePicture === null ? (
              "newPicture state does not exist"
            ) : (
              <EditIcon sx={{ fontSize: 36 }} />
            )}
          </button>
        </>
      ) }
    </div>
  );
}
