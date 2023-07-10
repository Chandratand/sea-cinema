import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addBalance = async (amount: string, userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  let updatedBalance = parseFloat(amount);
  if (user?.balance) {
    updatedBalance += user.balance;
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      balance: updatedBalance,
    },
  });

  return updatedBalance;
};

export const reduceBalance = async (amount: string, userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  let currentBalance = 0;
  if (user?.balance) {
    currentBalance += user.balance;
  }

  if (currentBalance < parseFloat(amount)) {
    throw new Error("Insufficient balance");
  }
  const updatedBalance = currentBalance - parseFloat(amount);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      balance: updatedBalance,
    },
  });

  return updatedBalance;
};
