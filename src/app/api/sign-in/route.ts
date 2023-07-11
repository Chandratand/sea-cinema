import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const {
    username,
    password,
  }: {
    username: string;
    password: string;
  } = await req.json();
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (user) {
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return NextResponse.json({ message: "Sign In Success", data: user });
      }
    }

    return NextResponse.json(
      { message: "Invalid Credentials" },
      { status: 401 }
    );
  }
  return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
}
