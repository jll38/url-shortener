import { Prisma } from "../../prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
    // Get the current date and time
    const now = new Date();

    // Set the time to midnight to get the start of today
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Subtract one day to get the start of the previous day
    const startOfPreviousDay = new Date(startOfToday);
    startOfPreviousDay.setDate(startOfPreviousDay.getDate() - 1);

    // The end of the previous day is one millisecond before the start of today
    const endOfPreviousDay = new Date(startOfToday);
    endOfPreviousDay.setMilliseconds(endOfPreviousDay.getMilliseconds() - 1);
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ ok: false });
  }
  
//Testing Purposes Code Below
//   const startOfPreviousDay = new Date("2023-12-14T00:00:00.000Z"); // Start of December 14, 2023
//   const endOfPreviousDay = new Date("2023-12-15T00:00:00.000Z"); // Start of December 15, 2023

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
                gte: startOfPreviousDay,
                lte: endOfPreviousDay,
              },
            },
          },
        },
      },
    },
  });
  UsersTraffic.map((user) => {
    let totalClicks = 0;
    user.links.map((link) => {
      totalClicks += link.traffic.length;
    });
    addRecord(user.id, totalClicks);
  });

  return NextResponse.json({ ok: true });
}

async function addRecord(userId, totalClicks) {
  await Prisma.DailyClicks.create({
    data: {
      userId: userId,
      clicks: totalClicks,
    },
  });
}
