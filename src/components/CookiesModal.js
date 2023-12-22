"use client";
import React, { useState, useEffect } from "react";
import { Modal, Sheet, Typography, Button } from "@mui/joy";
import { usePathname } from 'next/navigation'
import { cookiesPages } from "@/lib/constants";

export default function CookiesModal() {
  const [allowCookies, setAllowCookies] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const pathname = usePathname();

  useEffect(() => {
    const storedAllowCookies = localStorage.getItem("allowCookies") === "true";
    setAllowCookies(storedAllowCookies);
    setIsLoading(false); // Set loading to false after checking local storage
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem("allowCookies", "true");
    setAllowCookies(true);
  };

  if (!isLoading && !allowCookies && cookiesPages.includes(pathname)) {
    return (
      <Modal
        open={!allowCookies}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <Typography sx={{ fontWeight: "600" }}>Cookies Notice</Typography>
          <Typography>
            By using this site, you accept our use of cookies
          </Typography>
          <Button
            onClick={handleCookieAccept}
            variant="outlined"
            sx={{ marginTop: "10px" }}
          >
            I accept
          </Button>
        </Sheet>
      </Modal>
    );
  }

  return null;
}
