import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";
import { domain } from "@/lib/domain";
import qs from "qs";

export async function POST(request) {
  const { userId, timeZone } = await request.json();

  let URLS = await Prisma.Link.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      modifiedAt: "desc",
    },
  });

  console.log(await TopPerformingToday(userId, timeZone))
  return new NextResponse(
    JSON.stringify({ data: {links: await URLS, collections: await getCollections(userId)}, message: "MATCH FOUND" }),
    {
      status: 200,
    }
  );
}

async function getCollections(userId) {
  let collections = await Prisma.Collection.findMany({
    where: {
      userId: userId
    },
    select: {
      id: true,          
      name: true,
      createdAt: true,
      links: {
        select: {
          link: {
            select: {
              id: true,      
              name: true,
              originalURL: true,
              shortURL: true
            }
          }
        }
      }
    }
  });

  console.log(collections);
  return collections;
}



async function TopPerformingToday(userId, timeZone) {
  const moment = require("moment-timezone");

  const midnightUserTime = moment().tz(timeZone);
  const midnightUTC = midnightUserTime.clone().tz("UTC").format();
  
  const TodaysTraffic = await Prisma.User.findMany({
    select: {
      id: true, // Include other User fields as needed
      name: true,
      links: {
        select: {
          id: true, // Include other Link fields as needed
          name: true,
          originalURL: true,
          shortURL: true,
          traffic: {
            select: {
              id: true, // Include other Traffic fields as needed
            },
            where: {
              createdAt: {
                gte: midnightUTC,
              },
            },
          },
        },
      },
    },
  });
  
  // Aggregating shortURL occurrences
  const shortURLCounts = {};
  TodaysTraffic.forEach(user => {
    user.links.forEach(link => {
      link.traffic.forEach(() => {
        shortURLCounts[link.shortURL] = (shortURLCounts[link.shortURL] || 0) + 1;
      });
    });
  });
  
  // Finding the shortURL with the most occurrences
  let maxCount = 0;
  let mostFrequentShortURL = null;
  for (const shortURL in shortURLCounts) {
    if (shortURLCounts[shortURL] > maxCount) {
      maxCount = shortURLCounts[shortURL];
      mostFrequentShortURL = shortURL;
    }
  }
  
  console.log("Most frequent shortURL:", mostFrequentShortURL, "with", maxCount, "occurrences");
  
}
