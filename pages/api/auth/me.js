// pages/api/auth/me.js
import { verifyToken } from '../../../backend/utils/jwt';
import User from '../../../backend/models/User';
import dbConnect from '../../../backend/config/db';

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // First try to get token from Authorization header
    let token = null;
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    
    // If no token in header, try cookies
    if (!token) {
      token = req.cookies.auth_token;
    }
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    // Get user
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
}