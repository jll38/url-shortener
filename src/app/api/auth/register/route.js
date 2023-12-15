import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";

export async function POST(req, res) {
  const { name, email, password } = await req.json();
  const bcrypt = require("bcrypt");
  const saltRounds = 10;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Prisma.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
        salt,
      },
    });

    return NextResponse.json({ message: "Success! User created.", user });
  } catch (err) {
    console.error(err);
    return NextResponse.error({ message: "Error creating user" });
  }
}
