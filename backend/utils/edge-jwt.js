// backend/utils/edge-jwt.js
import { jwtVerify } from 'jose';

export async function verifyAuth(token) {
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