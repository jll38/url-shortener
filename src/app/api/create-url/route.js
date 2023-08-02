import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
export async function POST(request) {
  const prisma = new PrismaClient();
  const body = await request.json(); // parse the request body

  const urlRecord = await prisma.liteUrl.create({
    data: {
      originalURL: body.originalURL,
      shortURL: body.shortURL,
    }
  })
  
  return NextResponse.json({body});
}
