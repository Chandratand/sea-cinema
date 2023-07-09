// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      id: number;
      birthDate: string;
      balance: number;
      createdAt: string;
      updatedAt: string;
    } & DefaultSession["user"];
  }
}
