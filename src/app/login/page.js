"use client";
import Register from "@/components/auth/Register";
import { Navbar } from "@/components/Navbar";
import Login from "@/components/auth/Login";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/authHandlers";

export default function LoginPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
    
  }, []);

  return (
    <>
      {!user && (
        <>
          <Navbar />
          <main className="h-screen w-full flex justify-between items-center px-10">
            <section name="hero-text" className="w-1/2  hidden md:flex">
              <h1 className="visible text-[2em] lg:text-[3.5em] uppercase font-bold text-center">
                Welcome back!
              </h1>
            </section>
            <section name="register-box" className="w-full md:w-1/2">
              <h1 className="w-full text-left text-[3em] font-bold text-payne-gray mb-2">
                Login
              </h1>
              <Login />
            </section>
          </main>
        </>
      )}
      {user && window.location.assign("/dashboard")}
    </>
  );
}
