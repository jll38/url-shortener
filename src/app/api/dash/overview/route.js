import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";
import { domain } from "@/lib/domain";
import qs from "qs";
import { create } from "@mui/material/styles/createTransitions";

export async function POST(request) {
  const { userId, operation, timeZone } = await request.json();
  let data;
  const topPerformers = await getTopPerformers(userId);
  const { dailyClicks, todaysClicks } = await getDailyClicks(userId, timeZone);
  const weeklyClicks = await getWeeklyClicks(dailyClicks);
  const deviceAndBrowser = await getDeviceAndBrowser(userId);
  const referrers = await getReferrers(userId);
  return new NextResponse(
    JSON.stringify({
      data: {
        topPerformers,
        dailyClicks,
        weeklyClicks,
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
    take: 6,
  });
  const moment = require("moment-timezone");

  const midnightUserTime = moment().tz(timeZone).startOf("day");
  const midnightUTC = midnightUserTime.clone().tz("UTC").format();
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
      todaysClicks += link.traffic.length;
    });
  });
  return { dailyClicks, todaysClicks };
}

function getWeeklyClicks(dailyClicks) {
  const moment = require("moment-timezone");

  let weeklyClicksSummary = [];

  for (let i = 0; i < 5; i++) {
      const startOfWeek = moment().subtract(i, 'weeks').startOf('week');
      const endOfWeek = moment(startOfWeek).endOf('week');
      let totalClicks = 0;

      dailyClicks.forEach(click => {
          const clickDate = moment(click.createdAt); // Assuming 'createdAt' is the date field
          if (clickDate.isSameOrAfter(startOfWeek) && clickDate.isSameOrBefore(endOfWeek)) {
              totalClicks += click.clicks; // Assuming 'clicks' is the field for number of clicks
          }
      });

      // Using UTC Zulu time format for createdAt
      const createdAt = startOfWeek.utc().format();

      weeklyClicksSummary.push({ createdAt: createdAt, clicks: totalClicks });
  }

  return weeklyClicksSummary;
}

//Update for to only include traffic from links made by current user
async function getDeviceAndBrowser(userId) {
  const userLinks = await Prisma.Link.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  const linkIds = userLinks.map((link) => link.id);

  const TrafficRecords = await Prisma.Traffic.findMany({
    where: {
      linkId: {
        in: linkIds,
      },
    },
    select: {
      device: true,
      browser: true,
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
    if (referrer) {
      const selectedData = {
        title: referrer.source.title,
        sitename: referrer.source.sitename,
        description: referrer.source.description,
        images: referrer.source.images,
      };

      let existingEntry = allReferrers.find(
        (entry) =>
          entry.selectedData.sitename === selectedData.sitename &&
          entry.selectedData.description === selectedData.description
      );

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        allReferrers.push({ selectedData, count: 1 });
      }
    }
  }

  return allReferrers;
}
