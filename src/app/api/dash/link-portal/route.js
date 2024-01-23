import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";
import qs from "qs";

//AWS
import { uploadImage } from "@/lib/aws-helper";
import {
  S3_PROFILE_PICTURE_DIRECTORY_PREFIX,
  S3_LINK_PICTURE_DIRECTORY_PREFIX,
} from "@/lib/constants";

export async function POST(request) {
  const { userId, operation, data = null } = await request.json();

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ message: "No user specified" }, { status: 400 })
    );
  }

  if (!operation) {
    return new NextResponse(
      JSON.stringify({ message: "No operation specified" }, { status: 400 })
    );
  }

  const user = await Prisma.User.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return new NextResponse(
      JSON.stringify({ message: "User does not exist" }, { status: 404 })
    );
  }

  if (operation === "retrieve-portal") {
    let portalInfo = await Prisma.LinkPortal.findUnique({
      where: {
        userId: userId,
      },
      include: {
        links: true,
      },
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
  if (operation === "save") {
    if (!data || data.length === 0)
      return new NextResponse(
        JSON.stringify({ message: "Missing data" }, { status: 400 })
      );
    let formattedChanges = [];
    let name;
    let pictureLink;
    console.log(data);
    data.map((change) => {
      if (change.type === "link") {
        //ShortenURL and add to existing link portal
        formattedChanges.push("Link");
      }
      if (change.type === "name") {
        formattedChanges.push("Name");
        name = change.name;
      }
      if (change.type === "profile-image") {
        pictureLink = change.image.name;

      }
    });
    await Prisma.LinkPortal.upsert({
      where: {
        userId: userId,
      },
      create: {
        userId: userId,
        public: true,
      },
      update: {
        name: name,
        picture: pictureLink
      },
    });
    return new NextResponse(
      JSON.stringify({ message: formattedChanges }, { status: 200 })
    );
  }
}
