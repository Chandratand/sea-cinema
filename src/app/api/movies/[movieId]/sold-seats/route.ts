import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  context: { params: { movieId: string } }
) => {
  const id = Number(context.params.movieId) || 0;

  const soldSeats = await prisma.transactionDetail.findMany({
    where: {
      transaction: {
        movieID: id,
      },
    },
    select: {
      seatNumber: true,
    },
  });

  const seatNumbers = soldSeats.map(({ seatNumber }) => seatNumber);

  return NextResponse.json({ data: seatNumbers });
};
