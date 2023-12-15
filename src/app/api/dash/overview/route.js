import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";
import { domain } from "@/lib/domain";
import qs from "qs";

export async function POST(request) {
  const { userId, operation } = await request.json();

  let data;
  console.log("User ID: " + userId);
  console.log("Operation: " + operation);

  switch (operation) {
    case "top-performers":
      data = await getTopPerformers(userId);
      break;
  }
  console.log(getTopPerformers(userId));
  return new NextResponse(
    JSON.stringify({ data: await data, message: "MATCH FOUND" }),
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
  return topPerformers
}
