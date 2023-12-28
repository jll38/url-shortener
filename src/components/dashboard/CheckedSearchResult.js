"use client";
import React, { useState } from "react";
import { Sheet, Typography, Checkbox, Button } from "@mui/joy";
export function CheckedSearchResult({ value, valueId, setNewCollectionItems, newCollectionItems, isChecked }) {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    const newCheckedValue = !checked;
    setChecked(newCheckedValue);
    if (newCheckedValue) {
      setNewCollectionItems((oldValue) => [...oldValue, valueId]);
    } else {
      setNewCollectionItems(newCollectionItems.filter(item => item !== valueId));
    }
  };
  
  return (
    <Sheet className="hover:bg-gray-100 h-[30px] flex justify-between items-center px-2">
      <Typography>{value}</Typography>
      <Checkbox overlay onClick={handleCheck} checked={isChecked} />
    </Sheet>
  );
}
