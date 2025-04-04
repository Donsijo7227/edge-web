// backend/controllers/userController.js
import User from '@/backend/models/User';
import nodemailer from 'nodemailer';

// Helper function to send email with credentials
const sendCredentialEmail = async (email, password, name) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email options with improved template
    const mailOptions = {
      from: `"EDGE Gardening Club" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your EDGE Membership Information',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #2e7d32;">Welcome to Elmvale District Garden Enthusiasts!</h2>
          </div>
          
          <p>Hello ${name},</p>
          
          <p>Thank you for joining the Elmvale District Garden Enthusiasts (EDGE) community. Your membership has been processed, and we're excited to have you with us!</p>
          
          <p>You can now access member resources on our website using the following information:</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 15px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Temporary Password:</strong> ${password}</p>
          </div>
          
          <p>For security reasons, we recommend changing your password after your first login.</p>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
          
          <p>Happy gardening!</p>
          <p>The EDGE Team</p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    return res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Create new user (admin only)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber, address, membershipExpires } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password, // Will be hashed by the pre-save middleware
      role: role || 'member',
      phoneNumber,
      address,
      membershipExpires: membershipExpires || undefined // Use default if not provided
    });

    // Send credentials email to the new user
    const emailSent = await sendCredentialEmail(email, password, name);

    return res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        address: user.address,
        membershipExpires: user.membershipExpires,
        isActive: user.isActive
      },
      emailSent
    });
  } catch (error) {
    console.error('Create user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    // Debug info
    console.log('getUserById - req.query:', req.query);
    
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }
    
    const user = await User.findById(userId).select('-password');
    
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
    console.error('Get user by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, role, phoneNumber, address, membershipExpires } = req.body;
    const userId = req.query.id;

    // Find user and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        role,
        phoneNumber,
        address,
        membershipExpires,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.query.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Update password
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if current password matches
    const isMatch = await user.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Update password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};