import 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      id: string;
      email: string | null;
      name: string | null;
      image: string | null;
    };
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the built-in JWT types
   */
  interface JWT {
    id: string;
    email?: string | null;
    name?: string | null;
    picture?: string | null;
  }
}
