import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";
import { shorten } from "@/lib/shorten";

import { BASE_URL } from "@/lib/constants";

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
    console.log("Starting save operation...");
    if (!data || data.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Missing data" }, { status: 400 })
      );
    }

    let updates = { userId: userId, public: true };
    let linkPromises = [];

    data.forEach(change => {
      if (change.type === "link") {
        linkPromises.push(createAndFetchLink(change.link, userId, change.name));
      } else if (change.type === "name") {
        updates.name = change.name;
      } else if (change.type === "description") {
        updates.description = change.description;
      } else if (change.type === "profile-image") {
        updates.picture = change.picture; // Ensure this is the correct field for the image URL
      }
    });
    console.log(linkPromises);
    const links = (await Promise.all(linkPromises)).filter(id => id !== null);
    if (links.length > 0) {
      updates.links = { connect: links.map(id => ({ id })) };
    } else {
      // Handle the case where no valid links are available
      delete updates.links; // Remove the links field if it's empty
    }
    console.log(links);
    console.log("test")
    console.log(updates);
    console.log(updates.links);
    await Prisma.LinkPortal.upsert({
      where: { userId },
      create: updates,
      update: updates,
    });

    return new NextResponse(
      JSON.stringify({ message: "Published" }, { status: 200 })
    );
  }
}

async function createAndFetchLink(url, userId, name) {
  const shortURL = BASE_URL + await shorten(url);
  
  try {
    const response = await fetch(`${BASE_URL}/api/create-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        originalURL: url,
        shortURL,
        name: name,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    return data.id; // Make sure 'id' is the correct field from your API response
  } catch (err) {
    console.error("Error creating link:", err);
    return null; // Return null if there's an error, to avoid undefined values
  }
}
