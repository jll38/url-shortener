import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../prisma";

export async function POST(request) {
  const { userId, limit = null } = await request.json();

  // Fetch the IDs of links that belong to the user
  const userLinks = await Prisma.Link.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  // Extract the link IDs
  const linkIds = userLinks.map((link) => link.id);

  let urlRecord;
  if (limit) {
    urlRecord = await Prisma.Traffic.findMany({
      where: {
        linkId: {
          in: linkIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        link: true,
      },
      take: limit,
    });
  } else {
    urlRecord = await Prisma.Traffic.findMany({
      where: {
        linkId: {
          in: linkIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        link: true,
      },
    });
  }

  if (!urlRecord || urlRecord.length === 0) {
    return new NextResponse(JSON.stringify({ error: "No data found" }), {
      status: 404,
    });
  }
  const topCities = await getTopCity(urlRecord);
  return new NextResponse(
    JSON.stringify({ data: urlRecord, topCities, message: "MATCH FOUND" }),
    {
      status: 200,
    }
  );
}

async function getTopCity(records) {
  let data = records;

  let cityCounts = new Map();

  // Count each city
  data.forEach((item) => {
    let city = item.location.city;
    cityCounts.set(city, (cityCounts.get(city) || 0) + 1);
  });

  // Convert to an array and sort by count
  let sortedCities = Array.from(cityCounts).sort((a, b) => b[1] - a[1]);

  // Get top 5 cities or fill with null if less than 5 cities
  let top5Cities = sortedCities.slice(0, 5);
  while (top5Cities.length < 5) {
    top5Cities.push(null);
  }

  // Map to desired format
  let formattedTop5Cities = top5Cities.map((item) =>
    item ? { city: item[0], count: item[1] } : null
  );
  return formattedTop5Cities;
}
