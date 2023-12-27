import React from "react";
import { Sheet, Typography, Checkbox } from "@mui/joy";
export function CheckedSearchResult({value}) {
  return (
    <Sheet className="hover:bg-gray-100 h-[30px] flex justify-between items-center px-2">
      <Typography>{value}</Typography>
      <Checkbox overlay />
    </Sheet>
  );
}
