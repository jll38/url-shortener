import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";
import { domain } from "@/lib/domain";
import qs from "qs";

export async function POST(request) {
  const { userId, operation } = await request.json();

  let data;
  getDeviceAndBrowser();

  const topPerformers = await getTopPerformers(userId);
  const dailyClicks = await getDailyClicks(userId);
  const deviceAndBrowser = await getDeviceAndBrowser(userId);
  const referrers = await getReferrers(userId);
  return new NextResponse(
    JSON.stringify({
      data: { topPerformers, dailyClicks, deviceAndBrowser, referrers },
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

async function getDailyClicks(userId) {
  const dailyClicks = await Prisma.DailyClicks.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return dailyClicks;
}

//Update for to only include traffic from links made by current user
async function getDeviceAndBrowser() {
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
  return TrafficRecords;
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
      allReferrers.push(selectedData);
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
