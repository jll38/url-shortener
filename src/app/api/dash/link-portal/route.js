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
    let removeLinks = [];
    data.forEach((change) => {
      if (change.type === "link") {
        if (change.action === "remove") {
          removeLinks.push(change.link);
        } else {
          linkPromises.push(
            createAndFetchLink(
              change.link,
              userId,
              change.name,
              change.description,
              change.picture
            )
          );
        }
      } else if (change.type === "name") {
        updates.name = change.name;
      } else if (change.type === "description") {
        updates.description = change.description;
      } else if (change.type === "profile-image") {
        updates.picture = change.picture;
      }
    });
    console.log(linkPromises);
    const links = (await Promise.all(linkPromises)).filter((id) => id !== null);
    if (links.length > 0) {
      updates.links = { connect: links.map((id) => ({ id })) };
    } else {
      delete updates.links;
    }
    console.log(links);
    console.log(updates);
    console.log(updates.links);
    await Prisma.LinkPortal.upsert({
      where: { userId },
      create: updates,
      update: updates,
    });
    disconnectLinks(userId, removeLinks);

    return new NextResponse(
      JSON.stringify({ message: "Published" }, { status: 200 })
    );
  }
}

async function createAndFetchLink(url, userId, name, description, picture) {
  const shortURL = await shorten(url);
  console.log(name);
  try {
    const response = await fetch(`${BASE_URL}/api/create-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        userId: userId,
        originalURL: url,
        shortURL,
        description,
        picture,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    if (!data.id) {
      throw new Error("Missing link ID in the response");
    }
    return data.id;
  } catch (err) {
    console.error("Error in createAndFetchLink:", err);
    return new NextResponse(
      { error: "Error in Link creation: " + err },
      { status: 400 }
    );
  }
}

async function disconnectLinks(userId, linkIds) {
  if (!linkIds || linkIds.length === 0) {
    console.warn("No links specified for disconnection.");
    return;
  }

  try {
    const disconnectLinks = linkIds.map(shortURL => ({ shortURL }));

    await Prisma.LinkPortal.update({
      where: { userId },
      data: {
        links: {
          disconnect: disconnectLinks,
        },
      },
    });

    console.log(`Links disconnected successfully for user ${userId}.`);
  } catch (error) {
    console.error("Error in disconnecting links:", error);
    throw new Error("Error in disconnecting links: " + error.message);
  }
}

