// pages/api/users/update-password.js
import { updatePassword } from '../../../backend/controllers/userController';
import { isAuthenticated } from '../../../backend/middleware/auth';
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
    
    if (req.method === 'PUT') {
      return updatePassword(req, res);
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