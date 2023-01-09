import NextAuth, { type NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async signIn({ account, profile, user }) {
      const currentDate = new Date();

      if (account?.provider === "google" && profile?.email === user.email) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            emailVerified: currentDate,
          },
        });
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, account, user, profile, isNewUser }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
        await prisma.account.update({
          where: {
            id: user?.id,
          },
          data: {
            access_token: account.access_token,
          },
        });
      }
      return token;
    },
  },

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
            
        },
      },
    }),
  ],
};

export default NextAuth(authOptions);
