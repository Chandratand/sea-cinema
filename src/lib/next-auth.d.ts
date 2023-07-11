// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      username: string;
      password: string;
      id: number;
      age: number;
      balance: number;
      createdAt: string;
      updatedAt: string;
    } & DefaultSession["user"];
  }
  interface User {
    name: string;
    username: string;
    password: string;
    image: string;
    id: number;
    age: number;
    balance: number;
    createdAt: string;
    updatedAt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    username: string;
    password: string;
    id: number;
    age: number;
    balance: number;
    createdAt: string;
    updatedAt: string;
  }
}
