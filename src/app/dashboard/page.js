"use client";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/Navbar";

import Map from "react-map-gl";

export default function Dashboard() {
  return (
    <main className="h-screen overflow-x-hidden">
      <Navbar />
      <section name="lite-shortener" className="h-[625px] bg-peach">
        <div className="w-full h-[500px] flex items-center flex-col justify-center text-moonstone font-medium relative z-20">
          <Map
            mapboxAccessToken="pk.eyJ1IjoiamxlY2gxMiIsImEiOiJjbHBrcjZ5Z2EwMnJ1MmtxcWR2cXV3eHpxIn0.fp6J8z8bQUsv29G2kmXX6A"
            initialViewState={{
              longitude: -100,
              latitude: 37.8,
              zoom: 2,
            }}
            style={{ width: 600, height: 400 }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
