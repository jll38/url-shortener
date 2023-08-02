import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Redirect } from "next";

export async function GET(request) {
  const prisma = new PrismaClient();
  const body = await request.json(); // parse the request body
  const home = process.env.NEXT_PUBLIC_DEFAULT_DOMAIN;
  const shortURL = request.json().slug;
  try {
    const shortURLRecord = prisma.liteUrl.findFirst({
      where: {
        shortURL: shortURL,
      },
    });
    if (!shortURLRecord) {
      return NextResponse.json(home);
    } else {
      const originalURL = (await shortURLRecord).originalURL;
      return NextResponse.json({ originalURL });
    }
  } catch (e) {
    console.log("Error in fetching data", error);
    return NextResponse.error({ status: 500 });
  } finally {
    await prisma.$disconnect(); // Disconnect prisma client
  }

  return NextResponse.json({ body });
}
