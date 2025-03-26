// backend/controllers/authController.js
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

// Login user
export const login = async (req, res) => {
    try {
      console.log('Login request body:', req.body);
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({
          success: false,
          message: 'Please provide email and password'
        });
      }
  
      console.log('Finding user with email:', email);
      // Find user by email
      const user = await User.findOne({ email });
      
      console.log('User found:', user ? 'Yes' : 'No');
      // Check if user exists
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      console.log('Comparing passwords...');
      // Check if password matches
      const isMatch = await user.comparePassword(password);
      
      console.log('Password match:', isMatch ? 'Yes' : 'No');
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Update last login
      user.lastLogin = Date.now();
      await user.save();
  
      // Generate JWT token
      const token = generateToken(user._id, user.role);
  
      // Return user info and token
      return res.status(200).json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error details:', error);
      return res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  };

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};