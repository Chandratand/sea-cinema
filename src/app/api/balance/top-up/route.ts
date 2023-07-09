import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
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

  let updatedBalance = parseFloat(amount);
  if (user?.balance) {
    updatedBalance += user.balance;
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      balance: updatedBalance,
    },
  });

  return NextResponse.json({
    message: "Top up balance success!",
    data: updatedBalance,
  });
}
