// backend/controllers/bursaryController.js
import BursaryApplication from '../models/BursaryApplication';
import nodemailer from 'nodemailer';
import { createClient } from '@sanity/client';

// Initialize Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, 
  apiVersion: '2022-11-15',
  useCdn: false
});

// Helper function to send email notifications
const sendStatusEmail = async (application, status) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    let subject, htmlContent;
    
    if (status === 'approved') {
      subject = 'Congratulations! Your EDGE Bursary Application Has Been Approved';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #2e7d32;">Application Approved!</h2>
          </div>
          
          <p>Dear ${application.firstName} ${application.lastName},</p>
          
          <p>We are pleased to inform you that your application for the EDGE Local High School Bursary has been <strong>approved</strong>!</p>
          
          <p>We were impressed by your academic achievements and community involvement. Your application stood out among many qualified candidates.</p>
          
          <p>Next steps: Our team will contact you shortly with details about the bursary disbursement process and any additional information we may need.</p>
          
          <p>Congratulations again on this achievement!</p>
          
          <p>Best regards,<br>The EDGE Bursary Committee</p>
        </div>
      `;
    } else {
      subject = 'Update on Your EDGE Bursary Application';
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #2e7d32;">Application Status Update</h2>
          </div>
          
          <p>Dear ${application.firstName} ${application.lastName},</p>
          
          <p>Thank you for applying for the EDGE Local High School Bursary.</p>
          
          <p>After careful consideration of all applications, we regret to inform you that your application was not selected for this year's bursary.</p>
          
          <p>Please know that this decision does not diminish your achievements and potential. We encourage you to continue pursuing your educational goals and to consider applying for future opportunities.</p>
          
          <p>We wish you the very best in your academic endeavors.</p>
          
          <p>Sincerely,<br>The EDGE Bursary Committee</p>
        </div>
      `;
    }

    // Email options
    const mailOptions = {
      from: `"EDGE Bursary Committee" <${process.env.EMAIL_USER}>`,
      to: application.email,
      cc: application.parentEmail,
      subject: subject,
      html: htmlContent
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Status email sent successfully');
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// Submit new bursary application
export const submitApplication = async (req, res) => {
  try {
    // Extract form data
    const { 
      firstName, lastName, phoneNumber, email, address,
      parentFirstName, parentLastName, parentPhoneNumber, parentEmail,
      currentSchool, schoolAddress, currentGrade, expectedGraduation, gpa, extracurricular,
      whyNeedBursary, futureGoals, fullName, parentSignature
    } = req.body;
    
    // Get document references from the request (these would be uploaded to Sanity separately)
    const documentIds = req.body.documents || [];
    
    // Create application in MongoDB
    const application = await BursaryApplication.create({
      firstName, lastName, phoneNumber, email, address,
      parentFirstName, parentLastName, parentPhoneNumber, parentEmail,
      currentSchool, schoolAddress, currentGrade, expectedGraduation, gpa, extracurricular,
      whyNeedBursary, futureGoals, fullName, parentSignature,
      documents: documentIds
    });

    return res.status(201).json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Submit application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Get all bursary applications (admin only)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await BursaryApplication.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: applications.length,
      applications
    });
  } catch (error) {
    console.error('Get all applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Get application by ID
export const getApplicationById = async (req, res) => {
  try {
    const application = await BursaryApplication.findById(req.query.id)
      .populate('reviewedBy', 'name');
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    return res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Get application by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Update application status (admin only)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;
    const applicationId = req.query.id;
    const userId = req.user.userId;
    
    // Find and update application
    const application = await BursaryApplication.findByIdAndUpdate(
      applicationId,
      {
        status,
        reviewNotes: reviewNotes || '',
        reviewedBy: userId,
        reviewedAt: Date.now(),
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Send email notification if status is approved or rejected
    if (status === 'approved' || status === 'rejected') {
      await sendStatusEmail(application, status);
    }

    return res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Update application status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Delete application (admin only)
export const deleteApplication = async (req, res) => {
  try {
    const applicationId = req.query.id;
    
    // Find application to get document references
    const application = await BursaryApplication.findById(applicationId);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Delete documents from Sanity if they exist
    if (application.documents && application.documents.length > 0) {
      // For each document ID, delete from Sanity
      await Promise.all(application.documents.map(async (docId) => {
        try {
          await sanityClient.delete(docId);
        } catch (err) {
          console.error(`Error deleting Sanity document ${docId}:`, err);
          // Continue even if document deletion fails
        }
      }));
    }
    
    // Delete the application from MongoDB
    await BursaryApplication.findByIdAndDelete(applicationId);

    return res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Delete application error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// Bulk delete applications by status (admin only)
export const bulkDeleteApplications = async (req, res) => {
  try {
    const { status } = req.body;

    // Determine query based on status
    const isDeleteAll = status === 'all';
    const query = isDeleteAll ? {} : { status };

    console.log(`[Bulk Delete] Deleting ${isDeleteAll ? 'ALL' : `"${status}"`} applications`);

    // Fetch applications for document cleanup
    const applications = await BursaryApplication.find(query);
    const documentIds = applications.flatMap(app => app.documents || []);

    // Delete documents from Sanity
    if (documentIds.length > 0) {
      await Promise.all(documentIds.map(async (docId) => {
        try {
          await sanityClient.delete(docId);
        } catch (err) {
          console.error(`Error deleting Sanity document ${docId}:`, err);
        }
      }));
    }

    // Delete applications from MongoDB
    const result = await BursaryApplication.deleteMany(query);

    console.log(`[Bulk Delete] Deleted ${result.deletedCount} applications`);

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} application(s) deleted successfully`,
    });
  } catch (error) {
    console.error('Bulk delete applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
