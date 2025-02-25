// components/gallery/GalleryGrid.tsx
'use client'
import React from 'react';
import { Category } from '@/types/gallery';

const categories: Category[] = [
  {
    id: 1,
    title: "Bloom & Grow",
    description: "celebrate the beauty of flowers with workshops, plant sales, and exper talks on floral care",
    thumbnail: "/bloom-and-grow.jpg",
    slug: "nature"
  },
  {
    id: 2,
    title: "Urban Architecture",
    description: "Modern and classical architectural marvels from global cities",
    thumbnail: "/api/placeholder/400/300",
    slug: "architecture"
  },
  {
    id: 3,
    title: "Portrait Collection",
    description: "Compelling portraits capturing human emotions and stories",
    thumbnail: "/api/placeholder/400/300",
    slug: "portraits"
  },
  {
    id: 4,
    title: "Abstract Art",
    description: "Contemporary abstract photography pushing creative boundaries",
    thumbnail: "/api/placeholder/400/300",
    slug: "abstract"
  }
];

const GalleryGrid: React.FC = () => {
  const handleCategoryClick = (slug: string) => {
    window.location.href = `/gallery/${slug}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {categories.map((category) => (
          <div 
          key={category.id}
          className="relative cursor-pointer hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-xl bg-cover bg-center h-64 flex items-end h-300"
          style={{ 
            backgroundImage: `url(${category.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          onClick={() => handleCategoryClick(category.slug)}
        >
          {/* Gradient Overlay with Custom Color */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#a8d080] via-transparent to-transparent"></div>
        
          {/* Text Content */}
          <div className="relative z-10 p-4 text-black">
            <h2 className="text-xl font-bold">{category.title}</h2>
            <p className="text-sm">{category.description}</p>
          </div>
        </div>
        
        
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;