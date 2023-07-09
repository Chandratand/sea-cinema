import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      const {
        user: { email },
      } = session;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      const updatedSession = {
        ...session,
        user: { ...session.user, ...user },
      };

      return updatedSession;
    },
    async signIn({ profile }) {
      try {
        const userExist = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
        });
        if (!userExist) {
          await prisma.user.create({
            data: {
              email: profile?.email || "",
              name: profile?.name,
            },
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
