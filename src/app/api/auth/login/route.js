import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";

export async function POST(req, res) {
  const { email, password } = await req.json();
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  console.log("test")
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
    console.log("test2")

    if (existingUser === null) {
      return NextResponse.error({ message: "User not found" }, { status: 404 });
    }
    console.log("test3")

    const hashedPassword = await bcrypt.hash(password, existingUser.salt);

    if (existingUser.password === hashedPassword) {
      //JWT Payload
      const jwtUser = { id: existingUser.id, name: existingUser.name, email: existingUser.email };
      const accessToken = jwt.sign(jwtUser, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      console.log("test4")

      return NextResponse.json({ message: "Logging in user", accessToken }, { status: 200 });
    } else {
      console.log("test5")

      return NextResponse.error(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log("test6")
    console.error(error);
    return NextResponse.error(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
