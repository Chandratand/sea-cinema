import * as z from "zod";

export const topUpBalanceSchema = z.object({
  amount: z.string().refine((value) => Number(value) >= 50000, {
    message: "Top-up amount must be at least 50000",
  }),
});

export const withdrawBalanceSchema = z.object({
  bank: z.string(),
  accountNumber: z.string(),
  amount: z.string().refine((value) => Number(value) >= 50000, {
    message: "Withdraw amount must be at least 50000",
  }),
});
