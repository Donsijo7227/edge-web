// pages/api/bursary/[id].js
import { getApplicationById, updateApplicationStatus, deleteApplication } from '@/backend/controllers/bursaryController';
import dbConnect from '@/backend/config/db';
import { verifyToken } from '@/backend/utils/jwt';

export default async function handler(req, res) {
  await dbConnect();
  
  // Authentication check (all actions require admin)
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
  if (req.method === 'GET') {
    return getApplicationById(req, res);
  } else if (req.method === 'PUT') {
    return updateApplicationStatus(req, res);
  } else if (req.method === 'DELETE') {
    return deleteApplication(req, res);
  }
  
  return res.status(405).json({ 
    success: false, 
    message: 'Method not allowed' 
  });
}