import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { reduceBalance } from "../service";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    const updatedBalance = await reduceBalance(amount, session.user.id);

    return NextResponse.json({
      message: "Withdrawal successful!",
      data: updatedBalance,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}
