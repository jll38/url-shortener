import { NextResponse } from "next/server";
import { Prisma } from "../prisma";

export async function POST(request) {
  const body = await request.json(); // parse the request body
  console.log(body);
  const urlRecord = await Prisma.liteUrl.create({
    data: {
      originalURL: body.originalURL,
      shortURL: body.shortURL,
    }
  })
  
  return NextResponse.json(urlRecord); // Return the urlRecord which should be a valid JSON
}

