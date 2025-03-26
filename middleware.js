// middleware.js
import { NextResponse } from 'next/server';
import { verifyToken } from './backend/utils/jwt';
import { verifyAuth } from './backend/utils/edge-jwt';


// Simplified token verification directly in middleware
// const verifyToken = (token) => {
//     try {
//       // For debugging
//       console.log('JWT_SECRET in middleware:', process.env.JWT_SECRET?.substring(0, 3) + '...');
//       return jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       console.log('Middleware token verification error:', error.message);
//       return null;
//     }
//   };

export async function middleware(request) {
    console.log('Middleware running on path:', request.nextUrl.pathname);
    
    // Get token from cookies
    const token = request.cookies.get('auth_token')?.value;
    console.log('Token exists:', !!token);
    
    // Get the pathname
    const { pathname } = request.nextUrl;
    
    // Paths that require authentication
    const memberProtectedPaths = ['/account', '/member-hub'];
    const adminProtectedPaths = ['/admin', '/studio'];
    
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
    matcher: ['/account/:path*', '/member-hub/:path*', '/admin/:path*', '/studio/:path*'],
  };