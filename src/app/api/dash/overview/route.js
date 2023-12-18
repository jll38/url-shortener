import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";
import { domain } from "@/lib/domain";
import qs from "qs";

export async function POST(request) {
  const { userId, operation, timeZone } = await request.json();

  let data;
  getDeviceAndBrowser();

  const topPerformers = await getTopPerformers(userId);
  const { dailyClicks, todaysClicks } = await getDailyClicks(userId, timeZone);
  const deviceAndBrowser = await getDeviceAndBrowser(userId);
  const referrers = await getReferrers(userId);
  return new NextResponse(
    JSON.stringify({
      data: {
        topPerformers,
        dailyClicks,
        todaysClicks,
        deviceAndBrowser,
        referrers,
      },
      message: "MATCH FOUND",
    }),
    {
      status: 200,
    }
  );
}

async function getTopPerformers(userId) {
  const topPerformers = await Prisma.Link.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      clicks: "desc",
    },
    take: 5,
  });
  return topPerformers;
}

async function getDailyClicks(userId, timeZone) {
  const dailyClicks = await Prisma.DailyClicks.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  const moment = require("moment-timezone");

  const midnightUserTime = moment().tz(timeZone).startOf('day');
  const midnightUTC = midnightUserTime.clone().tz('UTC').format();
  console.log(midnightUTC)
  const UsersTraffic = await Prisma.User.findMany({
    select: {
      id: true, // Include other User fields as needed
      name: true,
      links: {
        select: {
          id: true, // Include other Link fields as needed
          traffic: {
            select: {
              id: true, // Include other Traffic fields as needed
              createdAt: true,
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
  let todaysClicks = 0;
  UsersTraffic.map((user) => {
    user.links.map((link) => {
      console.log(link.traffic);
      todaysClicks += link.traffic.length;
    });
  });
  return { dailyClicks, todaysClicks };
}

//Update for to only include traffic from links made by current user
async function getDeviceAndBrowser() {
  // Fetch the traffic records
  const TrafficRecords = await Prisma.Traffic.findMany({
    select: {
      device: true,
      browser: true,
    },
    where: {
      NOT: {
        device: null,
        browser: null,
      },
    },
  });

  // Initialize objects to hold the counts for devices and browsers
  const deviceCounts = {};
  const browserCounts = {};

  // Process each record
  TrafficRecords.forEach((record) => {
    // Count for device
    const device = record.device;
    if (deviceCounts[device]) {
      deviceCounts[device] += 1;
    } else {
      deviceCounts[device] = 1;
    }

    // Count for browser
    const browser = record.browser;
    if (browserCounts[browser]) {
      browserCounts[browser] += 1;
    } else {
      browserCounts[browser] = 1;
    }
  });

  // Convert the counts objects to arrays of objects
  const deviceCountArray = Object.entries(deviceCounts).map(
    ([device, count]) => ({ device, count })
  );
  const browserCountArray = Object.entries(browserCounts).map(
    ([browser, count]) => ({ browser, count })
  );
  console.log(deviceCountArray);
  return { deviceCountArray, browserCountArray };
}

//Update for to only include traffic from links made by current user
async function getReferrers() {
  const urlMetadata = require("url-metadata");

  const referrers = await Prisma.Traffic.findMany({
    select: {
      source: true,
    },
  });

  const allReferrers = [];
  for (const referrer of referrers) {
    // Skip processing if referrer is null
    if (!referrer || !referrer.source) {
      continue;
    }

    const rawData = await getMetadata(referrer);

    if (rawData) {
      const selectedData = {
        title: rawData.title,
        description: rawData.description,
        keywords: rawData.keywords,
      };

      let existingEntry = allReferrers.find(
        (entry) =>
          entry.selectedData.title === selectedData.title &&
          entry.selectedData.description === selectedData.description &&
          entry.selectedData.keywords === selectedData.keywords
      );

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        allReferrers.push({ selectedData, count: 1 });
      }
    }
  }
  return allReferrers;

  async function getMetadata(ref) {
    try {
      return await urlMetadata(ref.source, {
        mode: "same-origin",
        includeResponseBody: true,
      });
    } catch (err) {
      return { "fetch error": err };
    }
  }
}
