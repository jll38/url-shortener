import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "../../prisma";

export async function POST(req, res) {
  const { name, email, password, confirmPassword, passwordStrength } =
    await req.json();
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  console.log("bruh");
  console.log(confirmPassword);
  if (name === null)
    return NextResponse.json(
      { message: "Please enter a name." },
      { status: 400 }
    );
  console.log("bru2");

  if (name.length <= 3)
    return NextResponse.json(
      { message: "Please enter a valid name. (Greater than 3 characters)." },
      { status: 400 }
    );
  console.log(validateEmail(email));
  if (!validateEmail(email))
    return NextResponse.json(
      { message: "Please enter a valid email" },
      { status: 400 }
    );
  if (password === null)
    return NextResponse.json(
      { message: "Please enter a password" },
      { status: 400 }
    );
  if (passwordStrength <= 1)
    return NextResponse.json(
      { message: "Weak Password! Please try again." },
      { status: 400 }
    );
  console.log("Test" + confirmPassword);
  if (confirmPassword === null || confirmPassword !== password) {
    return NextResponse.json(
      { message: "Passwords do not match." },
      { status: 400 }
    );
  }

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

    return NextResponse.json(
      { message: "Success! User created." },
      { status: 200 }
    );
  } catch (err) {
    if (err.code === 'P2002') {
      // This is the error code for a unique constraint violation in Prisma
      return NextResponse.json({ message: "User with email already exists" }, { status: 400 });
    } else {
      console.error(err);
      return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }
  }
}

function validateEmail(email) {
  console.log(email);
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}
