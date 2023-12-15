"use client";
import Register from "@/components/auth/Register";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/authHandlers";

export default function RegisterPage() {
  const [user, setUser] = useState(null);
  
  //Get User Information
  useEffect(() => {
    setUser(getUser());
  }, []);

  if (!user)
    return (
      <>
        <Navbar />
        <main className="h-screen w-full flex justify-between items-center px-10">
          <section name="hero-text" className="w-1/2  hidden md:flex">
            <h1 className="visible text-[2em] lg:text-[3.5em] uppercase font-bold text-center">
              Elevate your experience
            </h1>
          </section>
          <section name="register-box" className="w-full md:w-1/2">
            <h1 className="w-full text-left text-[3em] font-bold text-payne-gray mb-2">
              Register
            </h1>
            <Register />
          </section>
        </main>
      </>
    );

  return <>{window.location.assign("/dashboard")}</>;
}
