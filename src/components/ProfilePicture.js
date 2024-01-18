"use client";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Edit } from "@mui/icons-material";
export function ProfilePicture({
  editable = false,
  setNewProfilePicture = null,
}) {
  const [showEditButton, setShowEditButton] = React.useState(false);

  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    // Handle the file...
  };

  return (
    <div
      className="h-[100px] w-[100px] grid place-items-center bg-gray-100  rounded-[10em] overflow-hidden"
      onMouseEnter={() => {
        if (editable) setShowEditButton(true);
      }}
      onMouseLeave={() => {
        if (editable) setShowEditButton(false);
      }}
    >
      {showEditButton ? (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
          <button
            className="w-full h-full hover:bg-gray-200"
            onClick={handleButtonClick}
          >
            {setNewProfilePicture === null ? (
              "newPicture state does not exist"
            ) : (
              <EditIcon />
            )}
          </button>
        </>
      ) : (
        "test"
      )}
    </div>
  );
}
