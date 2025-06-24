import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { DefaultSession, NextAuthOptions } from "next-auth"

// Extend the session type to include our custom fields
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      email: string | null
      name: string | null
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email || token.email || null
        token.name = profile.name || token.name || null
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // Create a new user object with the correct types
        session.user = {
          ...session.user,
          id: token.sub || "",
          email: token.email || null,
          name: token.name || null,
        }
      }
      return session
    },
  },
}

import { auth } from "@/lib/next-auth";

export const { GET, POST } = auth;