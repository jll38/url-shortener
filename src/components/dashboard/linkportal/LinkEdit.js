"use client";
import React from "react";
import { TruncateText } from "@/lib/general-helpers";

import {
  Sheet,
  Button,
  Modal,
  Typography,
  ModalDialog,
  ModalClose,
} from "@mui/joy";

import UndoIcon from "@mui/icons-material/Undo";

export function LinkEdit({ link, setUnsavedChanges, unsavedChanges }) {
  const [showRemove, setShowRemove] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [removed, setRemoved] = React.useState(false);

  const handleRemove = () => {
    setRemoved(true);
    if (unsavedChanges.length >= 0) {
      setUnsavedChanges([
        ...unsavedChanges,
        {
          name: null,
          description: null,
          type: "link",
          image: null,
          link: link.shortURL,
          action: "remove",
        },
      ]);
    } else {
      setUnsavedChanges([
        {
          name: null,
          description: null,
          type: "link",
          image: null,
          link: link.shortURL,
          action: "remove",
        },
      ]);
    }
  };

  const handleUndo = () => {
    setRemoved(false);
    const newArr = unsavedChanges.filter(
      (obj) =>
        !(obj && obj["link"] === link.shortURL && obj.action === "remove")
    );
    setUnsavedChanges(newArr);
    // Integrate with unsaved changes array
  };

  const handleEdit = () => {};

  const handleToastClose = () => {};
  return (
    <>
      <Modal open={modalOpen}>
        <ModalDialog>
          <Typography sx={{ fontWeight: 500 }}>Confirm</Typography>
          <hr />
          <Typography>Are you sure you want to delete this link?</Typography>
          <div className="flex">
            <Button color="danger" variant="plain">
              Delete
            </Button>
            <Button
              color="neutral"
              variant="plain"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </ModalDialog>
      </Modal>
      <div
        className="relative"
        onMouseEnter={() => {
          if (!removed) setShowRemove(true);
        }}
        onMouseLeave={() => {
          setShowRemove(false);
        }}
      >
        <Sheet
          sx={{
            width: "400px",
            height: "100px",
            overflow: "hidden",
            borderRadius: "20px",
          }}
          className="drop-shadow-md transition-colors duration-200 hover:bg-slate-100 z-20"
        >
          <div className="relative grid place-items-center">
            {removed ? (
              <button
                className="absolute z-20 w-full h-full"
                onClick={handleUndo}
              >
                <UndoIcon />
                <Typography>Undo</Typography>
              </button>
            ) : (
              <></>
            )}
            <button
              target="_blank"
              className={`relative ${removed ? "opacity-25 blur-[4px]" : ""}`}
              href={link.originalURL}
            >
              <div className="w-[400px] h-[100px] flex justify-start items-center px-10 gap-[40px]">
                <div className="bg-gray-300 h-[75px] w-[75px] rounded-md"></div>
                <div className="text-left">
                  <div className="font-semibold">{link.name || ""}</div>
                  <div className="text-slate-400">
                    {link.description && TruncateText(link.description, 24)}
                  </div>
                  <div></div>
                </div>
              </div>
            </button>
          </div>
        </Sheet>
        {!removed && (
          <Button
            onClick={handleRemove}
            variant="soft"
            color="danger"
            className={`z-0 absolute ${
              showRemove ? "-right-[100px]" : `right-0`
            } top-[40%] transition-all duration-200`}
          >
            Remove
          </Button>
        )}
      </div>
    </>
  );
}
