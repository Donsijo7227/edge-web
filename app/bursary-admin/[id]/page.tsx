// app/bursary/admin/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminPageLayout from '@/components/AdminPageLayout';
import { FiChevronLeft, FiDownload, FiCheck, FiX, FiTrash2 } from 'react-icons/fi';
import { use } from 'react';

interface BursaryApplication {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhoneNumber: string;
  currentSchool: string;
  schoolAddress: string;
  currentGrade: string;
  expectedGraduation: string;
  gpa: string;
  extracurricular: string;
  whyNeedBursary: string;
  futureGoals: string;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  reviewNotes: string;
  reviewedBy?: {
    _id: string;
    name: string;
  };
  reviewedAt?: string;
  createdAt: string;
}

export default function BursaryApplicationDetail({ params }) {
  const unwrappedParams = use(params);
  const applicationId = unwrappedParams.id;
  
  const router = useRouter();
  const [application, setApplication] = useState<BursaryApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [documents, setDocuments] = useState<{id: string, title: string, url: string}[]>([]);

  // Fetch application data
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/bursary/${applicationId}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch application');
        }

        const data = await response.json();
        setApplication(data.application);
        setReviewNotes(data.application.reviewNotes || '');
        setLoading(false);
        
        // Fetch document information from Sanity
        if (data.application.documents && data.application.documents.length > 0) {
          try {
            const docsResponse = await fetch('/api/bursary-documents', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                documentIds: data.application.documents
              }),
            });
            
            if (docsResponse.ok) {
              const docsData = await docsResponse.json();
              setDocuments(docsData.documents);
            }
          } catch (docError) {
            console.error('Error fetching documents:', docError);
          }
        }
      } catch (err) {
        setError('Error loading application');
        setLoading(false);
        console.error('Error fetching application:', err);
      }
    };

    fetchApplication();
  }, [applicationId]);

  // Update application status
  const updateStatus = async (status: 'approved' | 'rejected') => {
    setIsSaving(true);
    
    try {
      const response = await fetch(`/api/bursary/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          status,
          reviewNotes
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update application status');
      }

      const data = await response.json();
      setApplication(data.application);
      alert(`Application ${status === 'approved' ? 'approved' : 'rejected'} successfully. An email notification has been sent to the applicant.`);
    } catch (err) {
      console.error('Error updating application status:', err);
      alert('Failed to update application status');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete application
  const deleteApplication = async () => {
    if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/bursary/${applicationId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete application');
      }

      router.push('/bursary-admin');
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete application');
    }
  };

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <AdminPageLayout>
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-[#a8d080] border-t-[#123800] rounded-full animate-spin"></div>
        </div>
      </AdminPageLayout>
    );
  }

  if (error || !application) {
    return (
      <AdminPageLayout>
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          <p>{error || 'Application not found'}</p>
          <Link href="/bursary-admin" className="text-red-700 underline mt-2 inline-block">
            Return to Applications
          </Link>
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link
              href="/bursary-admin"
              className="text-[#123800] hover:text-[#a8d080] mr-4 flex items-center"
            >
              <FiChevronLeft className="mr-1" /> Back to Applications
            </Link>
            <h1 className="text-2xl font-bold text-[#123800]">
              Application: {application.firstName} {application.lastName}
            </h1>
          </div>
          
          <div className="flex items-center">
            {application.status === 'pending' && (
              <>
                <button
                  onClick={() => updateStatus('approved')}
                  disabled={isSaving}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-70 mr-2 flex items-center"
                >
                  <FiCheck className="mr-2" /> Approve
                </button>
                <button
                  onClick={() => updateStatus('rejected')}
                  disabled={isSaving}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-70 mr-4 flex items-center"
                >
                  <FiX className="mr-2" /> Reject
                </button>
              </>
            )}
            <button
              onClick={deleteApplication}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center"
            >
              <FiTrash2 className="mr-2" /> Delete
            </button>
          </div>
        </div>

        {/* Application Status */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">Application Status</h2>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  application.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : application.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
                <span className="ml-4 text-gray-600">Submitted: {formatDate(application.createdAt)}</span>
              </div>
            </div>
            
            {(application.status === 'approved' || application.status === 'rejected') && (
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {application.status === 'approved' ? 'Approved' : 'Rejected'} by: {application.reviewedBy?.name || 'Admin'}
                </p>
                <p className="text-sm text-gray-600">
                  {formatDate(application.reviewedAt || '')}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#123800]">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium">{application.firstName} {application.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{application.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{application.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{application.address}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 text-[#123800]">Parent/Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Parent Name</p>
                    <p className="font-medium">{application.parentFirstName} {application.parentLastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Parent Email</p>
                    <p className="font-medium">{application.parentEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Parent Phone</p>
                    <p className="font-medium">{application.parentPhoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Educational Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#123800]">Educational Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">School</p>
                  <p className="font-medium">{application.currentSchool}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">School Address</p>
                  <p className="font-medium">{application.schoolAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Grade</p>
                  <p className="font-medium">{application.currentGrade}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Expected Graduation</p>
                  <p className="font-medium">{application.expectedGraduation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">GPA</p>
                  <p className="font-medium">{application.gpa}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">Extracurricular Activities</p>
                <p className="mt-1 whitespace-pre-line">{application.extracurricular}</p>
              </div>
            </div>
            
            {/* Personal Statement */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#123800]">Personal Statement</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-[#123800]">Why they need this bursary</h3>
                <div className="bg-gray-50 p-4 rounded whitespace-pre-line">
                  {application.whyNeedBursary}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#123800]">Future Goals</h3>
                <div className="bg-gray-50 p-4 rounded whitespace-pre-line">
                  {application.futureGoals}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Supporting Documents */}
<div className="bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-semibold mb-4 text-[#123800]">Supporting Documents</h2>
  
  {documents.length === 0 ? (
    <p className="text-sm text-gray-500 italic">No documents available</p>
  ) : (
    <ul className="space-y-6">
      {documents.map((doc) => {
        console.log("Rendering document:", doc); // Add this debug line
        
        // If URL is a local path or invalid, show error
        if (!doc.url || doc.url.includes(':\\') || doc.url.includes('/tmp/')) {
          return (
            <li key={doc.id} className="space-y-2">
              <p className="font-medium text-gray-700">{doc.title}</p>
              <div className="border border-gray-200 rounded p-4 bg-red-50">
                <p className="text-sm text-red-600">
                  This file cannot be displayed. It may not have been properly uploaded.
                </p>
              </div>
            </li>
          );
        }
        
        const isPDF = doc.url.toLowerCase().endsWith('.pdf');
        const isImage = /\.(jpg|jpeg|png|gif)$/i.test(doc.url);
        
        return (
          <li key={doc.id} className="space-y-2">
            <p className="font-medium text-gray-700">{doc.title}</p>
            <p className="text-xs text-gray-500">{doc.url}</p> {/* Display URL for debugging */}
            
            {/* Preview area */}
            <div className="border border-gray-200 rounded overflow-hidden">
              {isPDF ? (
                <object
                  data={doc.url}
                  type="application/pdf"
                  className="w-full h-96"
                >
                  <p className="p-4">
                    PDF cannot be displayed. <a href={doc.url} target="_blank" rel="noopener noreferrer">Download instead</a>
                  </p>
                </object>
              ) : isImage ? (
                <img
                  src={doc.url}
                  alt={doc.title}
                  className="w-full max-h-[500px] object-contain"
                />
              ) : (
                <p className="text-sm text-gray-500 italic p-4">
                  Preview not supported for this file type.
                </p>
              )}
            </div>
            
            {/* View/Download fallback */}
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-[#123800] hover:underline"
            >
              <FiDownload className="mr-2" /> Open in new tab
            </a>
          </li>
        );
      })}
    </ul>
  )}
</div>
            
            {/* Review Notes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#123800]">Review Notes</h2>
              <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add your notes here..."
                className="w-full p-3 border border-gray-300 rounded resize-none h-40 focus:outline-none focus:ring-2 focus:ring-[#123800]"
                disabled={application.status !== 'pending'}
              ></textarea>
              
              {application.status === 'pending' && (
                <button
                  onClick={async () => {
                    setIsSaving(true);
                    try {
                      const response = await fetch(`/api/bursary/${applicationId}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                          status: application.status,
                          reviewNotes
                        }),
                      });
                      
                      if (response.ok) {
                        alert('Notes saved successfully');
                      } else {
                        throw new Error('Failed to save notes');
                      }
                    } catch (error) {
                      console.error('Error saving notes:', error);
                      alert('Failed to save notes');
                    } finally {
                      setIsSaving(false);
                    }
                  }}
                  disabled={isSaving}
                  className="mt-3 bg-[#123800] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors disabled:opacity-70"
                >
                  Save Notes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}