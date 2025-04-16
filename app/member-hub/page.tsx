// app/member-hub/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import GalleryHero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

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
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [resources, setResources] = useState<MemberResource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Only fetch resources if the user is authenticated
    if (user) {
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
    } else if (!authLoading) {
      // Set loading to false if not authenticated
      setLoading(false);
    }
  }, [user, authLoading]);

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

  // Show loading state while authentication is being checked
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-edge-green-dark rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // If user is not logged in, show login required page instead of redirecting
  if (!user) {
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
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto bg-edge-green-secondary rounded-lg shadow-lg overflow-hidden">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-edge-green-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-edge-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4a3 3 0 100-6 3 3 0 000 6zm-2 6h4a4 4 0 014 4v1H6v-1a4 4 0 014-4z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-edge-green-dark mb-4">Member Access Required</h2>
              <p className="text-lg text-edge-green-dark mb-8">
                Oops! You need to be logged in to access the Member Hub resources. Please sign in with your member account to continue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-white border border-edge-green-dark text-edge-green-dark rounded-md hover:bg-edge-green-secondary transition-all"
                >
                  Return to Home
                </button>
              </div>
            </div>
            <div className="bg-edge-green-primary h-2" />
          </div>
        </div>
      </>
    );
  }

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
        {/* Account navigation */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-edge-green-dark">Welcome, {user.name}!</h2>
            <button
              onClick={() => router.push('/account')}
              className="px-4 py-2 bg-edge-green-dark text-white rounded-md hover:bg-opacity-90"
            >
              My Account
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-10 h-10 border-4 border-edge-green-dark rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-3 text-red-500 bg-red-100 rounded-md font-zain">
            <p>{error}</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row" style={{ minHeight: "350px" }}>
            {/* Left column with image - Fixed height */}
            <div className="md:w-1/2 mb-4 md:mb-0">
              <div className="relative rounded-md overflow-hidden w-full bg-gray-100" style={{ height: "350px" }}>
                <Image 
                  src="/images/memberhub.jpg" 
                  alt="memberhub leaf"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  loading="eager"
                  onLoadingComplete={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-edge-green-dark rounded-full border-t-transparent animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column with resource links - Updated hover animation to match Garden Club page */}
            <div className="md:w-1/2 md:pl-8 flex flex-col h-full">
              <div className="w-full h-full flex flex-col justify-center">
                {resourceItems.map((item) => {
                  const resource = getResourceByCategory(item.id);
                  
                  return (
                    <div key={item.id} className="group mb-7">
                      <button 
                        onClick={() => resource && downloadResource(resource)}
                        className="flex items-center text-edge-green-dark hover:text-edge-green hover:bg-[#f5f9f1] py-3 px-2 rounded-lg transition-colors w-full"
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
                        <span className="flex-grow text-left font-bakbak text-h3-mobile md:text-h3">
                          {item.title}
                        </span>
                        <div className="ml-auto">
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-edge-green-dark transition-transform group-hover:translate-x-1"
                          >
                            <path 
                              d="M5 12H19M19 12L12 5M19 12L12 19" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
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