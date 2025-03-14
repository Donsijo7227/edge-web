'use client';

import { useState, useEffect } from 'react';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import GalleryHero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';

// TypeScript interface for member resources
interface MemberResource {
  _id: string;
  title: string;
  resourceFile: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  category: string;
  orderRank: number;
}

export default function MemberHub() {
  const [resources, setResources] = useState<MemberResource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const query = groq`
          *[_type == "memberResource"] | order(orderRank asc) {
            _id,
            title,
            resourceFile {
              asset-> {
                _ref,
                url
              }
            },
            category,
            orderRank
          }
        `;
        
        const data = await client.fetch(query);
        setResources(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch member resources");
        setLoading(false);
        console.error("Error fetching data from Sanity:", err);
      }
    };

    fetchResources();
  }, []);

  // Explicitly preload the image using the global window.Image constructor
  useEffect(() => {
    // Use the browser's native Image constructor, not the Next.js Image component
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = "/images/memberhub.jpg";
      img.onload = () => setImageLoaded(true);
    }
  }, []);

  const downloadResource = (resource: MemberResource) => {
    if (resource.resourceFile?.asset?.url) {
      window.open(resource.resourceFile.asset.url, '_blank');
    }
  };

  // Resource items with exact titles
  const resourceItems = [
    { id: 'codeOfConduct', title: 'Code of Conducts' },
    { id: 'constitution', title: 'EDGE Constitution' },
    { id: 'byLaws', title: 'By-Law' },
    { id: 'financialReports', title: 'Financial Year End Report' },
  ];

  // Find the resource by category
  const getResourceByCategory = (categoryId: string) => {
    return resources.find(resource => resource.category === categoryId);
  };

  return (
    <>
      <GalleryHero title="Member Hub" backgroundImage="images/memberhub-herobanner.jpg" />

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-2">
        <NextBreadcrumb
          homeElement={<span>Home</span>}
          separator={<span className="mx-2">&gt;</span>}
          containerClasses="flex items-center text-[#123800]"
          listClasses="hover:underline"
          activeClasses="font-semibold no-underline"
          capitalizeLinks={true}
        />
      </div>
      
      <div className="container px-4 py-4 mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-10 h-10 border-4 border-edge-green-dark rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-3 text-red-500 bg-red-100 rounded-md font-zain">
            <p>{error}</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:h-[350px]">
            {/* Left column with image - Fixed for mobile */}
            <div className="md:w-1/2 mb-4 md:mb-0 h-[350px] md:h-full">
              <div className="relative rounded-md overflow-hidden h-full w-full bg-gray-100">
                <Image 
                  src="/images/memberhub.jpg" 
                  alt="memberhub leaf"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  loading="eager"
                  onLoadingComplete={() => setImageLoaded(true)}
                  style={{ display: imageLoaded ? 'block' : 'none' }}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-edge-green-dark rounded-full border-t-transparent animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column with resource links */}
            <div className="md:w-1/2 md:pl-8 flex flex-col justify-between h-[350px] md:h-full py-12">
              <div className="w-full">
                {resourceItems.map((item) => {
                  const resource = getResourceByCategory(item.id);
                  
                  return (
                    <div key={item.id} className="group h-14 mb-7">
                      <button 
                        onClick={() => resource && downloadResource(resource)}
                        className="flex items-center text-edge-green-dark hover:text-edge-green font-bakbak text-h3-mobile md:text-h3 w-full"
                        disabled={!resource}
                      >
                        <div className="w-10 h-10 mr-4 flex-shrink-0 flex items-center justify-center">
                          <Image 
                            src="/leaf.svg" 
                            alt="Leaf icon" 
                            width={34} 
                            height={34}
                          />
                        </div>
                        <span className="flex-grow text-left">{item.title}</span>
                        <svg 
                          className="w-6 h-6 ml-auto text-edge-green-dark transform transition-transform group-hover:translate-x-1 flex-shrink-0" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}