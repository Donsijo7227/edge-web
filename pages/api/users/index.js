// pages/api/users/index.js
import { getAllUsers, createUser } from '../../../backend/controllers/userController';
import { isAuthenticated, isAdmin } from '../../../backend/middleware/auth';
import dbConnect from '../../../backend/config/db';

// Helper function to run middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  await dbConnect();
  
  try {
    // Run authentication middleware
    await runMiddleware(req, res, isAuthenticated);
    
    // For GET and POST, require admin role
    await runMiddleware(req, res, isAdmin);
    
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
    return res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
}