'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Scroll() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to check scroll position
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
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

  // If button isn't visible, return null instead of an empty fragment
  if (!isVisible) return null;

  // No wrapper elements, just the button
  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-edge-green-dark text-white shadow-lg hover:bg-edge-green-primary hover:text-edge-green-dark transition-all duration-300 z-50 md:bottom-8 md:right-8"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}