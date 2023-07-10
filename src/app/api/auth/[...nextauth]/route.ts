/* eslint-disable no-param-reassign */
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${process.env.BASE_URL}/api/sign-in`, {
            username: credentials?.username,
            password: credentials?.password,
          });

          if (res.data.data) {
            return res.data.data;
          }
          throw new Error("Invalid Credentials");
        } catch (error: any) {
          if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
          }
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
