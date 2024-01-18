import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";
import qs from "qs";

export async function POST(request) {
  const { userId, operation } = await request.json();

  if (!userId) {
    return NextResponse({ message: "No user specified" }, { status: 400 });
  }

  if (!operation) {
    return NextResponse({ message: "No operation specified" }, { status: 400 });
  }

  const user = await Prisma.User.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse({ message: "User does not exist" }, { status: 404 });
  }

  if (operation === "retrieve-portal") {
    let portalInfo = await Prisma.LinkPortal.findUnique({
      where: {
        userId: userId,
      },
      include:{
        links: true,
      }
    });

    if (!portalInfo) {
      portalInfo = await Prisma.LinkPortal.create({
        data: {
          userId: userId,
        },
      });
    }
    
    return new NextResponse(JSON.stringify(portalInfo));
  }
}
