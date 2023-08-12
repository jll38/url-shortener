"use client";
import Register from "@/components/auth/Register";
import { Navbar } from "@/components/Navbar";
 
export default function RegisterPage() {
  const underConstruction = false;
  if (underConstruction) {
    return (
      <>
        <div className="h-screen flex justify-center items-center bg-peach">
          <div>Page is Under Construction</div>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <main className="h-screen flex justify-center items-center bg-peach px-10">
        <div className="w-full h-full flex">
          <div className="h-full w-1/2 flex justify-center items-center pl-12">
            <h1 className="uppercase font-bold text-[4em] text-payne-gray">
              Elevate Your Experience
            </h1>
          </div>
          <section
            name="register-box"
            className="h-full w-1/2 flex justify-center items-center"
          >
            <Register/>
          </section>
        </div>
      </main>
    </>
  );
}
