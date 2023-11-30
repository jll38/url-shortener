import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../prisma";
import { domain } from "@/lib/domain";
import qs from "qs";

export async function GET(request) {
  const urlRecord = await Prisma.Traffic.findMany({
    where: {
      authority: "system"
    },
  });
  if (!urlRecord) return new NextResponse(JSON.stringify({ error: "No data found" }),{status: 404,})
  
  return new NextResponse(
    JSON.stringify({ data: urlRecord, message: "MATCH FOUND" }),
    {
      status: 200,
    }
  );
}