// pages/api/auth/forgot-password.js
import dbConnect from '../../backend/config/db';
import User from '../../backend/models/User';
import nodemailer from 'nodemailer';

// Generate random password
const generateRandomPassword = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Helper function to send password reset email
const sendPasswordResetEmail = async (email, newPassword, name) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email template
    const mailOptions = {
      from: `"EDGE Gardening Club" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset - EDGE Membership',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #123800;">Password Reset</h2>
          </div>
          
          <p>Hello ${name},</p>
          
          <p>You recently requested to reset your password for your Elmvale District Garden Enthusiasts (EDGE) account.</p>
          
          <p>Your account has been updated with a new temporary password:</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 15px 0;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>New Temporary Password:</strong> ${newPassword}</p>
          </div>
          
          <p>For security reasons, we recommend changing your password after your next login.</p>
          
          <p>If you did not request a password reset, please contact us immediately.</p>
          
          <p>Happy gardening!</p>
          <p>The EDGE Team</p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
    return true;
  } catch (error) {
    console.error('Password reset email sending error:', error);
    return false;
  }
};

export default async function handler(req, res) {
  try {
    // Connect to the database
    await dbConnect();
    
    // Only allow POST method
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        success: false, 
        message: 'Method not allowed' 
      });
    }

    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    
  // In your API route
if (!user) {
  console.log("API sending error response:", {
    success: false,
    message: 'No account found with this email address'
  });
  return res.status(200).json({
    success: false,
    message: 'No account found with this email address'
  });
}

    // Generate new random password
    const newPassword = generateRandomPassword();
    
    // Update user password
    user.password = newPassword;
    await user.save();

    // Send email with new password
    const emailSent = await sendPasswordResetEmail(email, newPassword, user.name);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send password reset email'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Password reset email sent successfully'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}