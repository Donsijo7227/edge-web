// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Edge-compatible token verification
async function verifyAuth(token) {
  if (!token) return null;
  
  try {
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(process.env.JWT_SECRET);
    
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error('Edge token verification error:', error);
    return null;
  }
}

export async function middleware(request) {
  console.log('Middleware running on path:', request.nextUrl.pathname);
  
  // Get token from cookies
  const token = request.cookies.get('auth_token')?.value;
  console.log('Token exists:', !!token);
  
  // Get the pathname
  const { pathname } = request.nextUrl;
  
  // Paths that require authentication
  const memberProtectedPaths = ['/account', '/member-hub'];
  const adminProtectedPaths = ['/admin', '/dashboard'];
  
  // Check if path is protected
  const isMemberProtectedPath = memberProtectedPaths.some(path => 
    pathname.startsWith(path)
  );
  
  const isAdminProtectedPath = adminProtectedPaths.some(path => 
    pathname.startsWith(path)
  );
  
  // If no token and trying to access protected route
  if (!token && (isMemberProtectedPath || isAdminProtectedPath)) {
    console.log('No token, redirecting to home');
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // If has token, verify it
  if (token && (isMemberProtectedPath || isAdminProtectedPath)) {
    try {
      const decoded = await verifyAuth(token);
      console.log('Token decoded:', !!decoded);
      
      // If invalid token
      if (!decoded) {
        console.log('Invalid token, redirecting to home');
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      // If admin protected path but user is not admin
      if (isAdminProtectedPath && decoded.role !== 'admin') {
        console.log('Not admin, redirecting to account');
        return NextResponse.redirect(new URL('/account', request.url));
      }
      
    } catch (error) {
      // Invalid token, redirect to home
      console.log('Token verification error:', error.message);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  console.log('Middleware allowing access');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/account/:path*', 
    '/member-hub/:path*', 
    '/admin/:path*', 
    '/dashboard/:path*'
  ],
};