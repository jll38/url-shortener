import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";

export async function POST(req, res) {
  const { email, password } = await req.json();
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  try {
    const existingUser = await Prisma.User.findUnique({
      where: { email: email },
      select: {
        id: true,
        salt: true,
        password: true,
      },
    });

    if (existingUser === null) {
      return NextResponse.error({ message: "User not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, existingUser.salt);

    if (existingUser.password === hashedPassword) {
      //JWT Payload
      const jwtUser = { id: existingUser.id, email: existingUser.email };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      return NextResponse.json({ message: "Logging in user" }, { status: 200 });
    } else {
      return NextResponse.error(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
