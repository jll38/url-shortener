import { NextResponse } from "next/server";
import { Prisma } from "../prisma";
import { ENVIRONMENT } from "@/lib/constants";


export async function POST(request) {
  const body = await request.json(); // parse the request body
  const devDomain = "http://localhost:3000/"
  const prodDomain = "http://tinyclicks.co/"
  const s = body.shortURL;
  try {
    const urlRecord = await Prisma.Link.create({
      data: {
        originalURL: body.originalURL,
        shortURL: body.shortURL,
        userId: body.userId,
      },
    });
    return NextResponse.json({short: s}); // Return the urlRecord which should be a valid JSON
  } catch (error) {
    // Check if error is due to unique constraint on shortURL
    if (error.code === "P2002" && error.meta?.target?.includes("shortURL")) {
      // Fetch the most recently created record with the same originalURL
      const existingRecord = await Prisma.Link.findFirst({
        where: {
          originalURL: body.originalURL,
        },
        orderBy: {
          createdAt: "desc", // Assuming you have a createdAt field
        },
        select: {
          shortURL: true,
        },
      });
      let domainLen = ENVIRONMENT === "dev" ? devDomain.length + 7 : prodDomain.length + 7;
      let short = existingRecord.shortURL;
      if (short.length > domainLen) {
        let instance = Number.parseInt(short.slice(domainLen))
        instance += 1;
        short = short.slice(0, domainLen) + `${instance}`;
        
      } else{
        console.log(short)
        short = short + `${2}`
      }
      const urlRecord = await Prisma.Link.create({
        data: {
          originalURL: body.originalURL,
          shortURL: short,
          userId: body.userId,
        },
      });
      return NextResponse.json({short})
    } else {
      // Handle other types of errors
      throw error;
    }
  }
}
