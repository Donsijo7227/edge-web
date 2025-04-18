'use client'
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react'; 

export default function LoginOverlay({ isOpen, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const overlayRef = useRef(null);

  // Close overlay when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await login(email, password);
      
      if (!result.success) {
        setError(result.message);
      } else {
        // Clear form and close overlay on successful login
        setEmail('');
        setPassword('');
        onClose(); // Close the login overlay
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (e) => {
        onClose(); // Close the login overlay
 
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#123800] bg-opacity-80 flex items-center justify-center z-50">
      <div 
        ref={overlayRef}
        className="bg-white rounded-lg p-8 max-w-md w-full relative "
        style={{ border: '2px solid #123800', fontFamily: 'Bakbak' }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Login form */}
        <h2 className="text-4xl font-bold text-center text-edge-green-dark mb-8 font-bakbak">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-edge-green-dark text-xl font-semibold mb-2 font-bakbak">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-edge-green-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-edge-green-primary font-zain"
              placeholder="Enter your email" 
              required
            />
          </div>
          
          <div className="relative">
            <label htmlFor="password" className="block text-edge-green-dark text-xl font-semibold mb-2 font-bakbak">
              Password
            </label>
            <input 
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-edge-green-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-edge-green-primary font-zain pr-12" // pr-12 to make space for the icon
              placeholder="********" 
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5  bottom-6 transform -translate-y-1/0 text-edge-green-dark focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-edge-green-dark text-white py-3 px-6 rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-edge-green-primary font-bakbak disabled:opacity-70"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        
        <div className="mt-6 text-center" onClick={handleClick}>
          <p className="text-edge-green-dark text-lg font-bakbak">or</p>
          <div className="mt-4 text-center">
            <Link 
              href="/forgot-password" 
              className="font-medium text-[#123800] hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}