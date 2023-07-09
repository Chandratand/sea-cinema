import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { amount } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  let currentBalance = 0;
  if (user.balance) {
    currentBalance += user.balance;
  }

  if (currentBalance < amount) {
    return NextResponse.json(
      { message: "Insufficient balance" },
      { status: 400 }
    );
  }
  const updatedBalance = currentBalance - parseFloat(amount);

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      balance: updatedBalance,
    },
  });

  return NextResponse.json({
    message: "Withdrawal successful!",
    data: updatedBalance,
  });
}
