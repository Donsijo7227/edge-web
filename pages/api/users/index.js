// Update all your API route files to use this approach

// pages/api/users/index.js
import { getAllUsers, createUser } from '@/backend/controllers/userController';
import dbConnect from '@/backend/config/db';
import { verifyToken } from '@/backend/utils/jwt';

export default async function handler(req, res) {
  await dbConnect();
  
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
  
  // Handle API routes
  try {
    if (req.method === 'GET') {
      return getAllUsers(req, res);
    } else if (req.method === 'POST') {
      return createUser(req, res);
    }
    
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  } catch (error) {
    console.error('API route error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message
    });
  }
}