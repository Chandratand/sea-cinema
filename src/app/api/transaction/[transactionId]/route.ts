import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { addBalance } from "../../balance/service";

const prisma = new PrismaClient();

export const DELETE = async (
  req: NextRequest,
  context: { params: { transactionId: string } }
) => {
  const session = await getServerSession(authOptions);
  const id = Number(context.params.transactionId);

  if (!id) {
    return NextResponse.json(
      { message: "Transaction ID is required" },
      { status: 400 }
    );
  }

  if (!session) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: { transactionDetail: true, user: true },
    });

    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    if (transaction.userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    await addBalance(transaction.totalPrice.toString(), session.user.id);

    await prisma.transactionDetail.deleteMany({
      where: { transactionId: id },
    });

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Transaction cancelled successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
