import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/app/api/prisma";
import { domain } from "@/lib/domain";
import qs from "qs";

export async function POST(request) {
  const requestBody = await request.json();
  const { userId, operation } = requestBody;

  switch (operation) {
    case "create":
      const { name, links } = requestBody;
      try {
        await NewCollection(name, userId, links);
        return NextResponse.json(
          { message: "Collection created successfully" },
          { status: 200 }
        );
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { message: "Error creating collection", error },
          { status: 500 }
        );
      }

    default:
      return NextResponse.json(
        { message: "Invalid operation" },
        { status: 400 }
      );
  }
}

async function NewCollection(name, userId, links) {
  await Prisma.Collection.create({
    data: {
      name,
      userId,
      links: {
        connect: links.map((link) => ({ id: link })),
      },
    },
  });
}
