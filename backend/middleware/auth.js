// backend/middleware/auth.js
import { verifyToken } from '@/backend/utils/jwt';

export const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    // Check if no token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token, authorization denied' 
      });
    }

    // Verify token
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token is not valid' 
      });
    }

    // Add user info to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };
    
    // Call next middleware
    return next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server Error' 
    });
  }
};

// Middleware to check if user is an admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  
  return res.status(403).json({ 
    success: false, 
    message: 'Access denied. Admin role required.' 
  });
};