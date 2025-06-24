import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname, searchParams } = request.nextUrl;
  const callbackUrl = searchParams.get('callbackUrl');

  // Allow access to public routes
  const publicPaths = ['/login', '/signup', '/api/auth'];
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path)
  ) || pathname === '/';

  // Handle auth callback
  if (pathname.startsWith('/api/auth/signin/google')) {
    return NextResponse.next();
  }

  // Redirect to dashboard if user is logged in and tries to access auth pages
  if (token) {
    if (pathname === '/login' || pathname === '/signup') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Allow access to public paths
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Redirect to login with callback URL for protected pages
  const loginUrl = new URL('/login', request.url);
  if (pathname !== '/') {
    loginUrl.searchParams.set('callbackUrl', pathname);
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|ico)$).*)',
  ],
};
