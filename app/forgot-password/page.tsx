'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NextBreadcrumb from '@/components/NextBreadcrumb'
import Hero from '@/components/hero'

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Clear any previous error
    
    if (!email) {
      toast.error('Please enter your email');
      setErrorMessage('Please enter your email');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (data.success === true) {
        setIsSuccess(true);
        toast.success('Password reset email sent successfully');
      } else {
        // Set visible error message in UI
        setErrorMessage(data.message || 'Failed to reset password');
        // Try toast with specific options
        toast.error(data.message || 'Failed to reset password', {
          duration: 4000,
          position: 'bottom-center',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Component */}
      <Hero
        title='Reset Password'
        backgroundImage="/images/about-us-hero-banner.jpg"
      />

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-4">
        <NextBreadcrumb
          homeElement={<span>Home</span>}
          separator={<span className="mx-2">&gt;</span>}
          containerClasses="flex items-center text-[#123800]"
          listClasses="hover:underline"
          activeClasses="font-semibold no-underline"
          capitalizeLinks={true}
        />
      </div>

      {/* Reset Password Form */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="h1-desktop h1-mobile font-heading text-[#123800] mb-6">
          Reset your password
        </h1>
        
        <div className="max-w-md w-full mx-auto space-y-8">
          {isSuccess ? (
            <div className="bg-green-50 p-6 rounded-xl border-2 border-[#123800]">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-[#123800]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-[#123800]">Success!</h3>
                  <div className="mt-2 body-desktop body-mobile text-[#123800]">
                    <p>
                      We&apos;ve sent a password reset email to <span className="font-semibold">{email}</span>. 
                      Please check your inbox and follow the instructions.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link href="/login" className="inline-flex items-center px-4 py-2 border-2 border-[#123800] rounded-md shadow-sm text-sm font-medium text-white bg-[#123800] hover:bg-[#0a1f00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#123800]">
                      Return to login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md -space-y-px">
                <div className="mb-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-[#123800] mb-1">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border-2 border-[#123800] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#123800] focus:border-[#123800] focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {!isSuccess && errorMessage && (
                <div className="bg-red-50 p-4 rounded-md border-2 border-red-400 mb-4">
                    <p className="text-red-800 text-sm">{errorMessage}</p>
                </div>
                )}
              </div>

              {/* <div className="text-sm text-center">
                <Link href="/login" className="font-medium text-[#123800] hover:underline">
                  Remember your password? Sign in
                </Link>
              </div> */}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-2 px-4 border-2 border-[#123800] text-sm font-medium rounded-lg text-white bg-[#123800] hover:bg-[#0a1f00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#123800] ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}