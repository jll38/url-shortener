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
  const linkIds = userLinks.map(link => link.id);

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

  return new NextResponse(
    JSON.stringify({ data: urlRecord, message: "MATCH FOUND" }),
    {
      status: 200,
    }
  );
}
