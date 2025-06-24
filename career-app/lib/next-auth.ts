import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions, DefaultSession } from "next-auth"
import jwt from 'jsonwebtoken';

interface AuthUser {
  id: string;
  email: string | null;
  name: string | null;
  image?: string | null;
}

// JWT token generation function
export function generateAuthToken(user: AuthUser): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name,
      image: user.image 
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
}

// Define our custom session type that extends DefaultSession
export type CustomSession = DefaultSession & {
  user: {
    id: string;
    email: string | null;
    name: string | null;
    image?: string | null;
  };
  expires: string;
};

// Extend the NextAuth types
declare module "next-auth" {
  interface Session extends CustomSession {}
}

// Configuration for NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.email = profile.email || token.email || null;
        token.name = profile.name || token.name || null;
        token.picture = (profile as any).picture || (profile as any).image_url || token.picture;
      }
      return token;
    },
    async session({ session, token }): Promise<CustomSession> {
      const customSession: CustomSession = {
        ...session,
        user: {
          ...session.user,
          id: token.sub || "",
          email: token.email || null,
          name: token.name || null,
          image: token.picture || null,
        },
        expires: session.expires
      };
      return customSession;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

// Initialize NextAuth
export const auth = NextAuth(authOptions);

export const { signIn, signOut } = auth;
