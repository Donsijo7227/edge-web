// app/recognition/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import GalleryHero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { use } from 'react';

interface RecognitionDetailProps {
  params: {
    slug: string;
  };
}

interface RecipientDetail {
  _id: string;
  name: string;
  mainImage: any;
  description: string;
  details: any;
  memberSince: string;
  term: string;
  category: string;
  testimonials: Array<{
    quote: string;
    author: string;
  }>;
}

const components = {
  block: {
    h1: ({children}: any) => <h1 className="heading-1 mb-4 text-edge-green-dark">{children}</h1>,
    h2: ({children}: any) => <h2 className="heading-2 mb-3 text-edge-green-dark">{children}</h2>,
    h3: ({children}: any) => <h3 className="heading-3 mb-2 text-edge-green-dark">{children}</h3>,
    normal: ({children}: any) => <p className="body-text mb-4 text-edge-text">{children}</p>,
  },
  marks: {
    link: ({value, children}: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-edge-green-dark underline hover:text-edge-green-accent"
        >
          {children}
        </a>
      );
    },
  },
};

export default function RecognitionDetailPage({ params }: RecognitionDetailProps) {
  const [recipient, setRecipient] = useState<RecipientDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use pathname to get the slug from the URL instead of params
  const pathname = usePathname();
  const slug = pathname ? pathname.split('/').pop() : '';
  

  useEffect(() => {
    const fetchRecipient = async () => {
      try {
        const query = groq`
          *[_type == "recognition" && slug.current == $slug][0] {
            _id,
            name,
            mainImage,
            description,
            details,
            memberSince,
            term,
            category,
            testimonials
          }
        `;
        
        const data = await client.fetch(query, { slug });
        setRecipient(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch recipient details");
        setLoading(false);
        console.error("Error fetching data from Sanity:", err);
      }
    };

    if (slug) {
      fetchRecipient();
    }
  }, [slug]);

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date not available';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate image URL
  const imageUrl = recipient?.mainImage 
    ? urlFor(recipient.mainImage)
        .width(1200)
        .height(800)
        .url()
    : '/placeholder.jpg';

  return (
    <>
      <GalleryHero title="Recognition" backgroundImage="/images/recognition-banner.jpg" />

      {/* Breadcrumbs */}
      <div className="w-full px-5 pt-4">
        <div className="flex items-center text-edge-text flex-wrap">
          <NextBreadcrumb
            homeElement={<span className="text-edge-green-dark hover:underline">Home</span>}
            separator={<span className="mx-1 text-edge-text"> &gt; </span>}
            activeClasses="text-edge-text font-bold" 
            containerClasses="flex items-center flex-wrap"
            listClasses="text-edge-green-dark hover:underline font-zain"
            capitalizeLinks
          />
        </div>
      </div>

      <div className="container px-4 mx-auto content-block">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 border-4 border-edge-green-dark rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-red-500 bg-red-100 rounded-md font-zain">
            <p>{error}</p>
          </div>
        ) : recipient ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Image column */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-md shadow-md h-96 lg:h-full">
                <Image
                  src={imageUrl}
                  alt={recipient.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Content column */}
            <div className="lg:col-span-7">
              <h1 className="heading-1 text-edge-green-dark mb-2">{recipient.name}</h1>
              
              <div className="mb-6">
                <span className="inline-block px-3 py-1 mb-4 text-white rounded-md bg-edge-green-dark font-zain">
                  {recipient.category || "Recognition"}
                </span>
                {recipient.term && (
                  <p className="font-zain text-edge-text">
                    <strong>Term of Service:</strong> {recipient.term}
                  </p>
                )}
                {recipient.memberSince && (
                  <p className="font-zain text-edge-text">
                    <strong>Member Since:</strong> {formatDate(recipient.memberSince)}
                  </p>
                )}
              </div>
              
              {recipient.description && (
                <div className="mb-6">
                  <h2 className="heading-2 text-edge-green-dark mb-2">About</h2>
                  <p className="body-text text-edge-text">{recipient.description}</p>
                </div>
              )}
              
              {recipient.details && (
                <div className="mb-8">
                  <PortableText 
                    value={recipient.details} 
                    components={components} 
                  />
                </div>
              )}
              
              {recipient.testimonials && recipient.testimonials.length > 0 && (
                <div className="mb-6">
                  <h2 className="heading-2 text-edge-green-dark mb-4">Testimonials</h2>
                  <div className="space-y-4">
                    {recipient.testimonials.map((testimonial, idx) => (
                      <div key={idx} className="p-4 rounded-md bg-edge-green-secondary">
                        <p className="italic body-text text-edge-text mb-2">"{testimonial.quote}"</p>
                        <p className="text-right font-zain text-edge-text">— {testimonial.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 text-edge-text bg-edge-green-secondary rounded-md font-zain">
            <p>No recipient found.</p>
          </div>
        )}
      </div>
    </>
  );
}