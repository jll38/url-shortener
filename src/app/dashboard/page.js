"use client";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/Navbar";
import { Table, Sheet } from "@mui/joy";
import { useState, useEffect } from "react";
import Map from "react-map-gl";

export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`/api/dash`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        window.location.assign("/");
      });
  }, []);

  function getTime(zTime) {
    const date = new Date(zTime);

    return `${date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    })}`;
  }

  function getDate(zTime) {
    const date = new Date(zTime);
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }

  return (
    <main className="h-screen overflow-x-hidden">
      <Navbar />
      <section className="h-[625px] bg-peach">
        <div className="flex items-center flex-col justify-center text-moonstone font-medium relative z-20">
          Dashboard
          <Sheet>
            {data && (
              <Table sx={{ display: "table-header-group" }}>
                <thead>
                  <tr>
                    <th>ShortURL</th>
                    <th>Destination</th>
                    <th>Location</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>IP</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((record, i) => {
                    return (
                      <tr key={"row-" + i}>
                        <td>{record.short}</td>
                        <td>{record.destination}</td>
                        <td>
                          {record.location.city}, {record.location.region_name}
                        </td>
                        <td>{getTime(record.createdAt)}</td>
                        <td>{getDate(record.createdAt)}</td>
                        <td>{record.location.ip}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Sheet>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const AggregateMap = () => {
  <Map
    mapboxAccessToken="pk.eyJ1IjoiamxlY2gxMiIsImEiOiJjbHBrcjZ5Z2EwMnJ1MmtxcWR2cXV3eHpxIn0.fp6J8z8bQUsv29G2kmXX6A"
    initialViewState={{
      longitude: -100,
      latitude: 37.8,
      zoom: 2,
    }}
    style={{ width: 600, height: 400 }}
    mapStyle="mapbox://styles/mapbox/dark-v11"
  />;
};
