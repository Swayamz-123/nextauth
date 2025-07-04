import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Publicly accessible routes
  const isPublicPath =
    path === '/login' ||
    path === '/signup' ||
    path === '/verifyEmail' ||
    path === '/forgotPassword' ||
    path === '/resetPassword';

  // Extract token from cookies
  const token = request.cookies.get('token')?.value || '';

  // If user is logged in and trying to access a public path, redirect to homepage
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If user is not logged in and trying to access a protected route, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Else allow to proceed
  return NextResponse.next();
}

// Define which routes this middleware should apply to
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyEmail',
    '/forgotPassword',
    '/resetPassword',
  ],
};
