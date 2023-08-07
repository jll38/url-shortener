import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import qs from "qs";

export async function GET(request) {
  let originalURL;
  const prisma = new PrismaClient();
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const slug = searchParams.get("slug");
  
  const urlRecord = await prisma.liteUrl.findFirst({
    where: {
      shortURL: "http://localhost:3000/" + slug,
    },
  });
  if (urlRecord){
    originalURL = urlRecord.originalURL;
  } else {
    return new NextResponse(JSON.stringify({error: "No matching url found"}), {
      status: 404,
    })
  }
  // Stringify the object and set it as the body parameter
  return new NextResponse(JSON.stringify({ url: originalURL, message: "MATCH FOUND" }), {
    status: 200,
  });
}

function doesExistJSON(url) {
  //Returns JSON object with information pertaining to whether the url exists in any database and which db it belongs to.
  //TODO: This function
  const exists = false; //False if doesn't exist in either database.
  const isPremium = false; //False if found in in liteURL database, True if not in liteURL but in premiumURL database
  return {
    exists: exists,
    isPremium: isPremium,
  };
}
