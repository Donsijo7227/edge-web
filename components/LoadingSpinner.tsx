import React from 'react';

const LoadingSpinner = ({ contentType = 'photos' }) => {
  return (
    <div className="w-full px-5 py-8 flex justify-center items-center">
      <div className="flex flex-col items-center">
        {/* Spinner animation */}
        <div className="relative w-16 h-16">
          <div className="absolute w-16 h-16 border-4 border-secondary rounded-full"></div>
          <div className="absolute w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Dynamic loading text */}
        <p className="mt-4 text-dark font-medium">Loading {contentType}...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;