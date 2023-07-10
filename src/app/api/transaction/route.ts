import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { reduceBalance } from "../balance/service";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { movieId, movieTitle, ticketPrice, totalPrice, selectedSeats } =
    await req.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  try {
    await reduceBalance(totalPrice, session.user.id);

    const transaction = await prisma.transaction.create({
      data: {
        movieID: movieId,
        movieTitle,
        ticketPrice,
        ticketCount: selectedSeats.length,
        totalPrice,
        userId: session.user.id,
        transactionDetail: {
          create: selectedSeats.map((seatNumber: number) => ({ seatNumber })),
        },
      },
      include: {
        transactionDetail: true,
        user: true,
      },
    });

    return NextResponse.json({
      message: "Buy Movie Ticket Success!",
      data: transaction,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 403 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.user.id,
    },
    include: { transactionDetail: true },
  });

  const transformedTransactions = transactions.map((transaction) => ({
    ...transaction,
    seatNumbers: transaction.transactionDetail.map(
      (detail) => detail.seatNumber
    ),
    transactionDetail: undefined,
  }));

  return NextResponse.json({
    data: transformedTransactions.reverse(),
  });
}
