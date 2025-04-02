// pages/api/auth/logout.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  
  // Clear the auth cookie
  res.setHeader('Set-Cookie', serialize('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    sameSite: 'strict',
    path: '/',
  }));
  
  res.status(200).json({ success: true, message: 'Logged out successfully' });
}