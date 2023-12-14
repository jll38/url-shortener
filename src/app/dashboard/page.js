"use client";
import { Table, Sheet, Typography, Skeleton } from "@mui/joy";

import mapboxgl from "mapbox-gl";
import Link from "next/link";
import { CircularProgress } from "@mui/joy";

import { getUser } from "@/lib/authHandlers";
import { useState, useEffect } from "react";
import { DASHBOARD_FETCH_INTERVAL, MAPBOX_API_KEY } from "@/lib/constants";

//Icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { ArrowDropUp } from "@mui/icons-material";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [recordLimit, setRecordLimit] = useState(10);
  const [moreRecords, setMoreRecords] = useState(true);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    setUser(getUser());
  });

  return (
    <main className="w-full h-full">
      <div className="h-[100px] p-4 flex gap-2 items-center">
        {user ? (
          <>
            <div>
              <Typography sx={{ fontWeight: 700 }} className={"text-[2em]"}>
                Welcome, {user.name}!
              </Typography>
              <Typography className={"text-[.8em]"}>
                Let&apos;s see how your links are doing.
              </Typography>
            </div>
            <div className="text-[2em]">👋🏻</div>
          </>
        ) : (
          <div className="mb-10">
            <Skeleton width={230} height={24} />
            <Skeleton width={200} height={12} className={"mt-[35px]"} />
          </div>
        )}
      </div>
      <div className="h-[320px] px-4 flex">
        <Sheet
          sx={{ width: "400px", height: "100%", boxShadow: 3, padding: "16px" }}
          className={"rounded-[1.5rem] shadow-lg"}
        >
          <Typography
            sx={{ fontSize: "1.5em" }}
            className="flex items-center gap-2"
          >
            <EmojiEventsIcon /> Top Performers
          </Typography>
          <Sheet className="h-[85%]">
            <Table
              sx={{
                "& thead th:nth-child(1)": { width: "10%" },
                "& thead th:nth-child(2)": { width: "30%" },
                "& thead th:nth-child(3)": { width: "35%" },
                "& thead th:nth-child(5)": { width: "10%" },
                "& tbody th": { borderRight: "2px solid gray" },
                "& tbody tr:nth-child(2)": {
                  bgcolor: "var(--joy-palette-neutral-100, #F0F4F8)",
                },
                "& tbody tr:nth-child(4)": {
                  bgcolor: "var(--joy-palette-neutral-100, #F0F4F8)",
                },
                "& thead th:nth-child(2)": { width: "30%" },
                "& tr ": { height: "20px", fontSize: ".9em" },
              }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Destination</th>
                  <th>Clicks</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <Link href={`/dashboard/links/`}>Test</Link>
                  </td>
                  <td>Test</td>
                  <td>20</td>
                  <td>
                    <ArrowDropUpIcon style={{ fill: "green" }} />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <Link href={`/dashboard/links/`}>Test</Link>
                  </td>
                  <td>Test</td>
                  <td>20</td>
                  <td>
                    <ArrowDropDownIcon style={{ fill: "red" }} />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <Link href={`/dashboard/links/`}>Test</Link>
                  </td>
                  <td>Test</td>
                  <td>20</td>
                  <td>
                    <ArrowDropUpIcon style={{ fill: "green" }} />
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <Link href={`/dashboard/links/`}>Test</Link>
                  </td>
                  <td>Test</td>
                  <td>20</td>
                  <td>
                    <ArrowDropUpIcon style={{ fill: "green" }} />
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <Link href={`/dashboard/links/`}>Test</Link>
                  </td>
                  <td>Test</td>
                  <td>20</td>
                  <td>
                    <ArrowDropDownIcon style={{ fill: "red" }} />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Sheet>
        </Sheet>
      </div>
    </main>
  );
}
//   mapboxgl.accessToken = MAPBOX_API_KEY;

//   const fetchData = async () => {
//     console.log("Fetching data...");
//     fetch(`/api/dash?limit=${recordLimit}`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(res.statusText);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setData(data);
//         if (data.data.length < recordLimit) {
//           setMoreRecords(false);
//         } else {
//           setMoreRecords(true);
//         }
//         console.log(data.data.length);
//         console.log(recordLimit);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         window.location.assign("/");
//       });
//   };

//   useEffect(() => {
//     const loggedInUser = getUser();

//     if (loggedInUser) {
//       setUser(loggedInUser);
//       fetchData();

//       // Call the API every X seconds
//       const interval = setInterval(fetchData, DASHBOARD_FETCH_INTERVAL * 1000); // replace X with your interval in seconds

//       // Clean up the interval on component unmount
//       return () => clearInterval(interval);
//     } else {
//       window.location.assign("/login");
//     }
//   }, [recordLimit]);

//   function getTime(zTime) {
//     const date = new Date(zTime);

//     return `${date.toLocaleTimeString("en-US", {
//       hour12: true,
//       hour: "numeric",
//       minute: "numeric",
//     })}`;
//   }

//   function getDate(zTime) {
//     const date = new Date(zTime);
//     return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
//   }

//   return (
//     <main className="h-screen overflow-x-hidden w-full">
//       {!data && (
//         <div className="h-screen w-full flex justify-center items-center">
//           <CircularProgress size="lg" />
//         </div>
//       )}
//       {data && (
//         <>
//           <section className="">
//             <div className="flex items-center flex-col justify-center text-moonstone font-medium relative z-20 text-[3em] px-4">
//               Dashboard
//               <Sheet
//                 sx={{
//                   borderRadius: "1rem",
//                   borderWidth: "2px",
//                   borderColor: "gray",
//                   overflowX: "scroll",
//                   maxWidth: "100%",

//                   "@media (max-width: 600px)": {
//                     ".MuiTable-root": {
//                       display: "block",
//                       overflowX: "auto",
//                     },
//                     "th, td": {
//                       padding: "8px",
//                     },
//                   },
//                 }}
//               >
//                 <Table
//                   sx={{ display: "table-header-group", overflow: "scroll" }}
//                 >
//                   <thead>
//                     <tr>
//                       <th>Source</th>
//                       <th>ShortURL</th>
//                       <th>Destination</th>
//                       <th>Location</th>
//                       <th>Time</th>
//                       <th>Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {data.data.map((record, i) => (
//                       <tr key={"row-" + i}>
//                         <td>{record.source}</td>
//                         <td>{record.short}</td>
//                         <td>{record.destination}</td>
//                         <td>
//                           {record.location.city}, {record.location.region_name}
//                         </td>
//                         <td>{getTime(record.createdAt)}</td>
//                         <td>{getDate(record.createdAt)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                   {moreRecords && (
//                     <tfoot className="w-full text-center flex justify-center items-center py-2 text-payne-gray">
//                       <button
//                         onClick={() => {
//                           setRecordLimit(recordLimit + 10);
//                         }}
//                       >
//                         Load More
//                       </button>
//                     </tfoot>
//                   )}
//                 </Table>
//               </Sheet>
//             </div>
//             <h2 className="text-center">Traffic Heatmap</h2>
//             <Map records={data.data}></Map>
//           </section>
//         </>
//       )}
//     </main>
//   );
// }

const Map = ({ records }) => {
  const coordinates = [];
  records.map((record) => {
    coordinates.push({
      lng: record.location.longitude,
      lat: record.location.latitude,
    });
    console.log(coordinates);
  });
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/dark-v11", // style URL
      center: [-74.5, 40],
      zoom: 9,
      attributionControl: false,
    });

    // Add your heatmap layer here
    map.on("load", function () {
      map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: coordinates.map((coord) => ({
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [coord.lng, coord.lat],
            },
          })),
        },
      });

      map.addLayer({
        id: "heatmap",
        type: "heatmap",
        source: "points",
        maxzoom: 15,
        paint: {
          "heatmap-radius": {
            stops: [
              [0, 2],
              [5, 20],
            ],
          },
        },
      });
    });
    return () => map.remove();
  }, []);

  return (
    <div style={{ height: "500px" }} className="flex justify-center ">
      <div
        id="map"
        style={{ height: "100%" }}
        className="rounded-[2rem] overflow-hidden w-[90%] sm:w-[75%]"
      />
    </div>
  );
};
