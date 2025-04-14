'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Hero from "@/components/hero";
import NextBreadcrumb from "@/components/NextBreadcrumb";

export default function BursaryApplication() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    parentFirstName: "",
    parentLastName: "",
    parentPhoneNumber: "",
    parentEmail: "",
    currentSchool: "",
    schoolAddress: "",
    currentGrade: "",
    expectedGraduation: "",
    gpa: "",
    extracurricular: "",
    whyNeedBursary: "",
    futureGoals: "",
    fullName: "",
    parentSignature: "",
    documents: [] as File[]
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Check if we're on mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Set up event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Simplified approach in your BursaryApplication component
// Simplified approach in your BursaryApplication component
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');
  
  try {
    const documentIds = [];
    
    // Convert files to base64
    if (formData.documents && formData.documents.length > 0) {
      for (const file of formData.documents) {
        // Create a FileReader to convert file to base64
        const base64File = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        
        // Send the base64 file to your API
        const uploadResponse = await fetch('/api/upload-base64-to-sanity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename: file.name,
            mimeType: file.type,
            base64: base64File
          }),
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload documents');
        }
        
        const uploadResult = await uploadResponse.json();
        documentIds.push(uploadResult.documentId);
      }
    }
    
    // Continue with form submission
    const response = await fetch('/api/bursary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        documents: documentIds
      }),
    });
    
    // Handle the response
    if (response.ok) {
      // Clear form data
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
        parentFirstName: "",
        parentLastName: "",
        parentPhoneNumber: "",
        parentEmail: "",
        currentSchool: "",
        schoolAddress: "",
        currentGrade: "",
        expectedGraduation: "",
        gpa: "",
        extracurricular: "",
        whyNeedBursary: "",
        futureGoals: "",
        fullName: "",
        parentSignature: "",
        documents: []
      });
      
      // Set success state to show success message
      setSuccess(true);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Failed to submit application');
    }
  } catch (error) {
    console.error('Error submitting application:', error);
    setError('An unexpected error occurred. Please try again later.');
  } finally {
    setIsSubmitting(false);
  }
};
   
  // Function to fill form with test data (for development only)
const fillTestData = () => {
  // Create a test file (this will only work in development)
  const testFile = new File(['test content'], 'test-document.pdf', { type: 'application/pdf' });
  
  setFormData({
    firstName: "John",
    lastName: "Smith",
    phoneNumber: "555-123-4567",
    email: "john.smith@example.com",
    address: "123 Main Street, Elmvale, ON",
    parentFirstName: "Mary",
    parentLastName: "Smith",
    parentPhoneNumber: "555-987-6543",
    parentEmail: "mary.smith@example.com",
    currentSchool: "Elmvale District High School",
    schoolAddress: "456 School Road, Elmvale, ON",
    currentGrade: "12",
    expectedGraduation: "June 2025",
    gpa: "3.8",
    extracurricular: "- Student Council President\n- Varsity Basketball Team\n- Environmental Club\n- Volunteer at Local Food Bank",
    whyNeedBursary: "As the eldest of three siblings in a single-parent household, the financial burden of post-secondary education is significant for my family. While I have maintained part-time employment throughout high school to save for college, these funds alone are insufficient to cover tuition and living expenses.\n\nThis bursary would help alleviate the financial strain of my education and allow me to focus more on my studies rather than working excessive hours during the school year. It would be instrumental in helping me achieve my educational goals without accumulating overwhelming student debt.",
    futureGoals: "I plan to pursue a degree in Environmental Science at the University of Guelph, with the goal of specializing in sustainable agriculture. Growing up in a rural community has inspired me to find innovative solutions to environmental challenges facing modern farming.\n\nAfter completing my undergraduate degree, I hope to either pursue graduate studies or work directly with agricultural organizations to implement sustainable practices. My ultimate career goal is to develop and promote environmentally responsible farming methods that can be implemented in communities like Elmvale.",
    fullName: "John Smith",
    parentSignature: "Mary Smith",
    documents: [testFile]
  });
};
  return (
    <>
      {/* Hero Component */}
      <Hero 
        title="Local High School Annual Bursary Application" 
        backgroundImage="/images/bursary-hero-banner.jpg"
      />
      {process.env.NODE_ENV === 'development' && (
  <div className="mb-6">
    <button
      type="button"
      onClick={fillTestData}
      className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
    >
      Fill Test Data (Dev Only)
    </button>
  </div>
)}

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-4">
        <NextBreadcrumb 
          homeElement={<span>Home</span>}
          separator={<span className="mx-2">/</span>}
          containerClasses="flex items-center text-edge-green-dark"
          listClasses="hover:underline"
          activeClasses="font-semibold no-underline"
          capitalizeLinks={true}
        />
      </div>
      
      {/* Application Form Section */}
      <div className="container mx-auto px-4 py-6 content-block">
        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
            <p className="mb-4">Thank you for submitting your bursary application. We have received your information and will review it shortly.</p>
            <p className="mb-4">You will be notified via email once a decision has been made regarding your application.</p>
            <Link href="/" className="inline-block bg-[#123800] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors">
              Return to Homepage
            </Link>
          </div>
        ) : (
          <>
            <h2 className="heading-2 text-edge-green-dark mb-6">
              Fill in the information below then submit to complete your bursary application.
            </h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Personal Information Section */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="heading-3 text-edge-green-dark mb-6">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-base font-medium text-edge-green-dark mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-base font-medium text-edge-green-dark mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-base font-medium text-edge-green-dark mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-base font-medium text-edge-green-dark mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-base font-medium text-edge-green-dark mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="parentFirstName" className="block text-base font-medium text-edge-green-dark mb-1">
                      Parent/Guardian First Name
                    </label>
                    <input
                      type="text"
                      id="parentFirstName"
                      name="parentFirstName"
                      value={formData.parentFirstName}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="parentLastName" className="block text-base font-medium text-edge-green-dark mb-1">
                      Parent/Guardian Last Name
                    </label>
                    <input
                      type="text"
                      id="parentLastName"
                      name="parentLastName"
                      value={formData.parentLastName}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="parentPhoneNumber" className="block text-base font-medium text-edge-green-dark mb-1">
                      Parent/Guardian Phone Number
                    </label>
                    <input
                      type="tel"
                      id="parentPhoneNumber"
                      name="parentPhoneNumber"
                      value={formData.parentPhoneNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="parentEmail" className="block text-base font-medium text-edge-green-dark mb-1">
                      Parent/Guardian Email
                    </label>
                    <input
                      type="email"
                      id="parentEmail"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Educational Information Section */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="heading-3 text-edge-green-dark mb-6">Educational Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="currentSchool" className="block text-base font-medium text-edge-green-dark mb-1">
                      Current High School
                    </label>
                    <input
                      type="text"
                      id="currentSchool"
                      name="currentSchool"
                      value={formData.currentSchool}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="schoolAddress" className="block text-base font-medium text-edge-green-dark mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="schoolAddress"
                      name="schoolAddress"
                      value={formData.schoolAddress}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="currentGrade" className="block text-base font-medium text-edge-green-dark mb-1">
                      Current Grade
                    </label>
                    <input
                      type="text"
                      id="currentGrade"
                      name="currentGrade"
                      value={formData.currentGrade}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="expectedGraduation" className="block text-base font-medium text-edge-green-dark mb-1">
                      Expected Graduation Date
                    </label>
                    <input
                      type="text"
                      id="expectedGraduation"
                      name="expectedGraduation"
                      value={formData.expectedGraduation}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="gpa" className="block text-base font-medium text-edge-green-dark mb-1">
                      GPA
                    </label>
                    <input
                      type="text"
                      id="gpa"
                      name="gpa"
                      value={formData.gpa}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="extracurricular" className="block text-base font-medium text-edge-green-dark mb-1">
                    List all of the Extracurricular Activities that you have participated:
                  </label>
                  <textarea
                    id="extracurricular"
                    name="extracurricular"
                    value={formData.extracurricular}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                    required
                  />
                </div>
              </div>
              
              {/* Personal Statement Section */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="heading-3 text-edge-green-dark mb-6">Personal Statement</h3>
                
                <div className="mb-6">
                  <label htmlFor="whyNeedBursary" className="block text-base font-medium text-edge-green-dark mb-1">
                    Why do you need this bursary, and how will it help you? (250-500 words)
                  </label>
                  <textarea
                    id="whyNeedBursary"
                    name="whyNeedBursary"
                    value={formData.whyNeedBursary}
                    onChange={handleChange}
                    rows={8}
                    className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="futureGoals" className="block text-base font-medium text-edge-green-dark mb-1">
                    What are your future education and career goals?
                  </label>
                  <textarea
                    id="futureGoals"
                    name="futureGoals"
                    value={formData.futureGoals}
                    onChange={handleChange}
                    rows={8}
                    className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                    required
                  />
                </div>
              </div>
              
              {/* Supporting Documents Section - Updated with Dropbox */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="heading-3 text-edge-green-dark mb-6">Supporting Documents</h3>
                
                <div className="mb-2">
                  <p className="text-base text-edge-green-dark font-medium mb-1">
                    Upload your Letter of Recommendation and Academic Transcript 
                    <span className="text-red-500">*</span>
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Please upload both your Letter of Recommendation and Academic Transcript (maximum 2 files).
                  </p>
                </div>
                
                <div className="border-2 border-dashed border-[#123800] rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    id="documents"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 2) {
                        alert("You can only upload a maximum of 2 files");
                        e.target.value = "";
                        return;
                      }
                      setFormData(prev => ({
                        ...prev,
                        documents: e.target.files ? Array.from(e.target.files) : []
                      }));
                    }}
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  
                  <label htmlFor="documents" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-[#123800] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <span className="text-edge-green-dark font-medium">
                        Drag and drop files here, or click to browse
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        Supported formats: PDF, DOC, DOCX, JPG, PNG
                      </span>
                    </div>
                  </label>
                  
                  {formData.documents && formData.documents.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium text-edge-green-dark">Files selected:</p>
                      <ul className="mt-2 space-y-1">
                        {formData.documents.map((file, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {file.name}
                            <button 
                              type="button"
                              className="ml-2 text-red-500 hover:text-red-700"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  documents: prev.documents.filter((_, i) => i !== index)
                                }));
                              }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Consent and Declaration Section */}
              <div className="bg-white p-6 rounded-lg">
                <h3 className="heading-3 text-edge-green-dark mb-6">Consent and Declaration</h3>
                
                <div className="mb-6">
                  <div className="flex items-start mb-2">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id="consent"
                        className="w-4 h-4 border border-[#123800] rounded bg-gray-50 focus:ring-edge-green-dark"
                        required
                      />
                    </div>
                    <label htmlFor="consent" className="ml-3 text-base font-medium text-edge-green-dark">
                      I certify that all information provided is true and accurate.
                    </label>
                  </div>
                  
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Type your full name here."
                    className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                    required
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="parentSignature" className="block text-base font-medium text-edge-green-dark mb-1">
                    Parent/Guardian Signature
                  </label>
                  <input
                    type="text"
                    id="parentSignature"
                    name="parentSignature"
                    value={formData.parentSignature}
                    onChange={handleChange}
                    placeholder="Type your full name here."
                    className="w-full p-2 border border-[#123800] rounded-md focus:ring-edge-green-dark focus:border-edge-green-dark"
                    required
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-edge-green-dark text-white font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-edge-green-dark focus:ring-offset-2 disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
            {isSubmitting && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full text-center">
                  <div className="flex justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-edge-green-dark animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Submitting your application...
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Please don’t refresh or close this window.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}