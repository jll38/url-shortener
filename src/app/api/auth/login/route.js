import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";

export async function POST(req, res) {
  const { email, password } = await req.json();
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");

  if (email === null)
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  if (password === null)
    return NextResponse.json({ message: "Enter a password" }, { status: 400 });

  try {
    const existingUser = await Prisma.User.findUnique({
      where: { email: email },
      select: {
        id: true,
        salt: true,
        password: true,
        name: true,
      },
    });
    if (existingUser === null) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, existingUser.salt);

    if (existingUser.password === hashedPassword) {
      //JWT Payload
      const jwtUser = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      };
      const accessToken = jwt.sign(
        jwtUser,
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return NextResponse.json(
        { message: "Logging in user", accessToken },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
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
