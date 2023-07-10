import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const {
    username,
    password,
    name,
    age,
  }: {
    username: string;
    password: string;
    name: string;
    age: string;
  } = await req.json();

  // Cek apakah username sudah ada di database
  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "Username has been used!" },
      { status: 409 }
    );
  }

  const userAge = Number(age);
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  // Buat user baru
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      name,
      age: userAge,
    },
  });

  return NextResponse.json({ message: "Sign Up Success", data: newUser });
}
