// This file contains the NextAuth configuration
import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

// Configuration for NextAuth
const authConfig: NextAuthOptions = {
  providers: [], // Will be extended in auth.ts
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Initial sign in
      if (account && user) {
        token.id = user.id;
        token.email = user.email ?? null;
        token.name = user.name ?? null;
        token.picture = (user as any).image ?? null;
      } else if (profile) {
        // For OAuth providers
        const profileAny = profile as any;
        token.email = profile.email ?? token.email;
        token.name = profile.name ?? token.name;
        token.picture = profileAny.picture ?? profileAny.image_url ?? token.picture;
      }
      return token as JWT;
    },
    async session({ session, token }) {
      if (session.user) {
        // Create a new user object with the correct types
        const user = {
          ...session.user,
          id: token.sub || token.id || '',
          email: token.email ?? null,
          name: token.name ?? null,
          image: token.picture ?? null,
        };
        
        // Assign the typed user back to the session
        // @ts-ignore - We know this is safe because we're providing all required fields
        session.user = user;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'default-secret-key',
  debug: process.env.NODE_ENV === 'development',
};

export default authConfig;
