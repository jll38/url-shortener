import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Redirect } from "next";

export async function GET(request) {
  const prisma = new PrismaClient();
  const slug = request.query;
  console.log("Slug " + slug);
  try {
    //TODO: Handle GET request and check DB
    const shortURLRecord = prisma.liteUrl.findFirst({
      where: {
        shortURL: slug,
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

function doesExistJSON(url){ //Returns JSON object with information pertaining to whether the url exists in any database and which db it belongs to.
  //TODO: This function
  const exists = false; //False if doesn't exist in either database.
  const isPremium = false; //False if found in in liteURL database, True if not in liteURL but in premiumURL database
  return {
    exists: exists,
    isPremium: isPremium
  }
}