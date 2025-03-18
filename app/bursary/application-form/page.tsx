'use client';

import { useState, useEffect } from "react";
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
    letterOfRecommendation: null,
    academicTranscript: null
  });

  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: e.target.files ? e.target.files[0] : null
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Here you would typically send the data to your backend
    alert("Your application has been submitted successfully!");
  };

  return (
    <>
      {/* Hero Component */}
      <Hero 
        title="Local High School Annual Bursary Application" 
        backgroundImage="/images/bursary-hero-banner.jpg"
      />

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
        <h2 className="heading-2 text-edge-green-dark mb-6">
          Fill in the information below then submit to complete your bursary application.
        </h2>
        
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
          
          {/* Supporting Documents Section */}
          <div className="bg-white p-6 rounded-lg">
            <h3 className="heading-3 text-edge-green-dark mb-6">Supporting Documents</h3>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="block sm:w-64 text-base font-medium text-edge-green-dark mb-2 sm:mb-0">Letter of Recommendation</span>
                <div className="flex-1">
                  <label className="inline-block px-4 py-2 bg-edge-green-dark text-white rounded-md cursor-pointer hover:opacity-90">
                    Upload
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'letterOfRecommendation')}
                    />
                  </label>
                  {formData.letterOfRecommendation && (
                    <span className="ml-3 text-base text-edge-green-dark">
                      File selected: {(formData.letterOfRecommendation as File).name}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="block sm:w-64 text-base font-medium text-edge-green-dark mb-2 sm:mb-0">Academic Transcript</span>
                <div className="flex-1">
                  <label className="inline-block px-4 py-2 bg-edge-green-dark text-white rounded-md cursor-pointer hover:opacity-90">
                    Upload
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'academicTranscript')}
                    />
                  </label>
                  {formData.academicTranscript && (
                    <span className="ml-3 text-base text-edge-green-dark">
                      File selected: {(formData.academicTranscript as File).name}
                    </span>
                  )}
                </div>
              </div>
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
              className="px-8 py-3 bg-edge-green-dark text-white font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-edge-green-dark focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}