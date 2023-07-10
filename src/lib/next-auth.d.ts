// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      password: string;
      image: string;
      id: number;
      age: int;
      balance: number;
      createdAt: string;
      updatedAt: string;
    } & DefaultSession["user"];
  }
  interface User {
    name: string;
    email: string;
    password: string;
    image: string;
    id: number;
    age: int;
    balance: number;
    createdAt: string;
    updatedAt: string;
  }
}
