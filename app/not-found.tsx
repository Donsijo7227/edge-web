// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-[#123800] mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-[#123800] text-white rounded-md hover:bg-opacity-90 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}