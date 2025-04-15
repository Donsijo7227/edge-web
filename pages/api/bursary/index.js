// pages/api/bursary/index.js
import { submitApplication, getAllApplications } from '@/backend/controllers/bursaryController';
import dbConnect from '@/backend/config/db';
import { verifyToken } from '@/backend/utils/jwt';

export default async function handler(req, res) {
  await dbConnect();
  
  // For POST requests (submitting applications), no auth required
  if (req.method === 'POST') {
    return submitApplication(req, res);
  }
  
  // For GET requests (admin viewing all applications), auth required
  if (req.method === 'GET') {
    // Authentication check
    const token = req.cookies?.auth_token;
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authenticated' 
      });
    }
    
    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }
    
    // Check if user is admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin role required.' 
      });
    }
    
    // Add user info to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };
    
    return getAllApplications(req, res);
  }
  
  return res.status(405).json({ 
    success: false, 
    message: 'Method not allowed' 
  });
}