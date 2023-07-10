import * as z from "zod";

export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const signUpSchema = z
  .object({
    username: z.string(),
    name: z.string(),
    age: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const topUpBalanceSchema = z.object({
  amount: z.string().refine((value) => Number(value) >= 50000, {
    message: "Top-up amount must be at least 50000",
  }),
});

export const withdrawBalanceSchema = z.object({
  accountNumber: z.string(),
  bank: z.string(),
  amount: z.string().refine((value) => Number(value) >= 50000, {
    message: "Withdraw amount must be at least 50000",
  }),
});
