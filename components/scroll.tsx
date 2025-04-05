'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Scroll() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Function to check scroll position and calculate progress
    const handleScroll = () => {
      // Calculate how far down the page we've scrolled
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate progress percentage (0 to 1)
      const progress = Math.min(scrollTop / scrollHeight, 1);
      
      if (scrollTop > 300) {
        setIsVisible(true);
        setScrollProgress(progress);
      } else {
        setIsVisible(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click with explicit type
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // If button isn't visible, return null
  if (!isVisible) return null;

  // Calculate SVG parameters for the circle
  const size = 48; // Size of the button
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 focus:outline-none"
      aria-label="Scroll to top"
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full">
        {/* SVG container for the circles */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle 
            cx={size/2} 
            cy={size/2} 
            r={radius}
            fill="transparent"
            stroke="#edf2e9" 
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle - rotated to start from the top */}
          <circle 
            cx={size/2} 
            cy={size/2} 
            r={radius}
            fill="transparent"
            stroke="#123800" 
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size/2} ${size/2})`}
            style={{ transition: 'stroke-dashoffset 0.1s ease-in-out' }}
          />
        </svg>
        
        {/* Button content */}
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-edge-green-primary text-edge-green-dark hover:bg-edge-green-dark hover:text-white transition-all duration-300" style={{ width: 'calc(100% - 6px)', height: 'calc(100% - 6px)', margin: '3px' }}>
          <ArrowUp size={20} />
        </div>
      </div>
    </button>
  );
}