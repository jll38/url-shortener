import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/app/api/prisma";
import { domain } from "@/lib/domain";
import qs from "qs";
import { ENVIRONMENT } from "@/lib/constants";
import { TOP_LEVEL_ROUTES } from "@/lib/constants";
import { validAlias } from "@/lib/shorten";
export async function POST(request) {
  const body = await request.json();
  const toChange = body.selectedShort;
  const userId = body.userId;
  if (body.operation === "alias") {
    let alias = body.value;
    console.log(alias);
    if (TOP_LEVEL_ROUTES.includes(alias) || !validAlias(alias)) 
      return NextResponse.json({ message: "Invalid alias." }, { status: 400 });
    
    alias =
      ENVIRONMENT === "dev"
        ? "http://localhost:3000/" + body.value
        : "http://tinyclicks.co/" + body.value;

    const existingAlias = await Prisma.Link.findFirst({
      where: { shortURL: alias },
    });

    if (existingAlias)
      return new NextResponse.json(
        { message: "Alias already exists." },
        { status: 400 }
      );

    await Prisma.Link.update({
      where: { shortURL: toChange },
      data: {
        shortURL: alias,
        modifiedAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } else if (body.operation === "name") {
    let name = body.value;
    const existingName = await Prisma.Link.findFirst({
      where: { name: name, userId: userId },
    });
    if (existingName)
      return NextResponse.json(
        {
          message:
            "You already have a link with this name. Please try another.",
        },
        { status: 400 }
      );

    await Prisma.Link.update({
      where: { shortURL: toChange },
      data: {
        name: name,
        modifiedAt: new Date(),
      },
    });
  } else if (body.operation === "destination") {
    let destination = "http://" + body.value;

    await Prisma.Link.update({
      where: { shortURL: toChange },
      data: {
        originalURL: destination,
        modifiedAt: new Date(),
      },
    });
  }
}
