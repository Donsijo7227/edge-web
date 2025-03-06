// components/gallery/GalleryGrid.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { Category } from '@/types/gallery';
import { client, urlFor } from '@/sanity/lib/client';
import Link from 'next/link';

const GalleryGrid: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await client.fetch(`
          *[_type == "category"] {
            _id,
            title,
            description,
            "slug": slug.current,
            thumbnail
          }
        `);

        const formattedCategories = data.map((item: any) => ({
          id: item._id,
          title: item.title,
          description: item.description || '',
          slug: item.slug,
          thumbnail: item.thumbnail ? urlFor(item.thumbnail).url() : "/api/placeholder/400/300"
        }));
        
        setCategories(formattedCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load gallery categories. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchCategories();
  }, []);

  const handleCategoryClick = (slug: string) => {
    window.location.href = `/gallery/${slug}`;
  };

  if (loading) {
    return (
      <div className="w-full px-5">
        <p>Loading gallery categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-5">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="w-full px-5">
        <p>No gallery categories found. Please add some categories in the Sanity Studio.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            className="relative cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg"
            onClick={() => handleCategoryClick(category.slug)}
          >
            {/* Image */}
            <div className="relative h-80 w-full">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${category.thumbnail})`,
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#a8d080] to-transparent opacity-90"></div>
              
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-black">
                <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                <p className="text-sm">{category.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;