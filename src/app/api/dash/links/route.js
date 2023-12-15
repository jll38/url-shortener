import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";
import { domain } from "@/lib/domain";
import qs from "qs";

export async function POST(request) {
  const { userId } = await request.json();

  let URLS = await Prisma.Link.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(URLS);
  return new NextResponse(
    JSON.stringify({ data: await URLS, message: "MATCH FOUND" }),
    {
      status: 200,
    }
  );
}
