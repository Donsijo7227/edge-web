// components/recognition/RecognitionGrid.tsx
'use client';

import { useState, useEffect } from 'react';
import { groq } from 'next-sanity';
import Link from 'next/link';
import Image from 'next/image';
import { client, urlFor } from '@/sanity/lib/client';

// TypeScript interface for recognition recipients
interface RecognitionRecipient {
  _id: string;
  name: string;
  recognizedFor: string;
  mainImage: any;
  slug: {
    current: string;
  };
}

// Recognition Card component - update just this part in your file
const RecognitionCard = ({ recipient }: { recipient: RecognitionRecipient }) => {
    // Generate image URL with parameters that prevent head cropping
    const imageUrl = urlFor(recipient.mainImage)
      .width(800)
      .height(1000) // Increased height to ensure faces stay in frame
      .url(); // Using default settings to respect hotspot without forced cropping
  
    return (
      <div className="relative overflow-hidden rounded-md shadow-md h-96">
        <Link href={`/recognition/${recipient.slug.current}`}>
          <div className="relative w-full h-full transition-transform duration-300 hover:scale-105">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={recipient.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover object-[center_25%]" // Position at 25% from top to show faces
                priority
              />
            )}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="font-bakbak text-h3-mobile md:text-h3 text-white">{recipient.name}</h3>
              <p className="font-zain text-white">Recognized for {recipient.recognizedFor}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  };

// Pagination component remains the same
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: { 
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center mt-8 mb-12">
      {currentPage > 1 && (
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          className="px-3 py-1 mx-1 text-edge-green-dark font-zain hover:underline"
        >
          ← Previous
        </button>
      )}
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 mx-1 font-zain ${
            currentPage === page ? "bg-edge-green-dark text-white rounded-sm" : "text-edge-green-dark hover:underline"
          }`}
        >
          {page}
        </button>
      ))}
      
      {currentPage < totalPages && (
        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          className="px-3 py-1 mx-1 text-edge-green-dark font-zain hover:underline"
        >
          Next →
        </button>
      )}
    </div>
  );
};

// The rest of the RecognitionGrid component remains the same
export default function RecognitionGrid() {
  const [recipients, setRecipients] = useState<RecognitionRecipient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recipientsPerPage = 6;

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const query = groq`
          *[_type == "recognition"] | order(name asc) {
            _id,
            name,
            recognizedFor,
            mainImage,
            slug
          }
        `;
        
        const data = await client.fetch(query);
        setRecipients(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch recipients");
        setLoading(false);
        console.error("Error fetching data from Sanity:", err);
      }
    };

    fetchRecipients();
  }, []);

  // Calculate pagination values
  const indexOfLastRecipient = currentPage * recipientsPerPage;
  const indexOfFirstRecipient = indexOfLastRecipient - recipientsPerPage;
  const currentRecipients = recipients.slice(indexOfFirstRecipient, indexOfLastRecipient);
  const totalPages = Math.ceil(recipients.length / recipientsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container px-4 py-8 mx-auto content-block">
      <h1 className="heading-1 mb-8 text-edge-green-dark">Recognition</h1>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-edge-green-dark rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-4 text-red-500 bg-red-100 rounded-md font-zain">
          <p>{error}</p>
        </div>
      ) : recipients.length === 0 ? (
        <div className="p-4 text-edge-text bg-edge-green-secondary rounded-md font-zain">
          <p>No recognition recipients found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentRecipients.map((recipient) => (
              <RecognitionCard key={recipient._id} recipient={recipient} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
}