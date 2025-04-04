// pages/api/users/[id].js
import { getUserById, updateUser, deleteUser } from '@/backend/controllers/userController';
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
  
  // Get the user ID from the query
  const userId = req.query.id;
  
  // Handle API routes
  try {
    if (req.method === 'GET') {
      return getUserById(req, res);
    } else if (req.method === 'PUT') {
      return updateUser(req, res);
    } else if (req.method === 'DELETE') {
      return deleteUser(req, res);
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