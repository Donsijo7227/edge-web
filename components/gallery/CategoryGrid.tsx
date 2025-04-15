// components/gallery/CategoryGrid.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '@/types/gallery';
import { client, urlFor } from '@/sanity/lib/client';
import { useParams } from 'next/navigation';
import LoadingSpinner from '../LoadingSpinner';

interface CategoryGridProps {
  slug?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ slug: propSlug }) => {
  const params = useParams();
  const slug = propSlug || (params?.slug as string);
  
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchPhotos() {
      if (!slug) {
        setError('No category specified');
        setLoading(false);
        return;
      }
    
      try {
        // First, fetch the category to get its title
        const categoryData = await client.fetch(`
          *[_type == "category" && slug.current == $slug][0] {
            _id,
            title
          }
        `, { slug });
    
        if (!categoryData) {
          setError(`Category "${slug}" not found`);
          setLoading(false);
          return;
        }
    
        setCategoryTitle(categoryData.title);
        
        // Then fetch all photos for this category
        const photoData = await client.fetch(`
          *[_type == "photo" && category._ref == $categoryId] {
            _id,
            category->{title},
            images
          }
        `, { categoryId: categoryData._id });
        
        // Explicitly type the array to match the Photo interface
        const formattedPhotos: Photo[] = [];
        
        photoData.forEach((item: any) => {
          if (item.images && Array.isArray(item.images)) {
            // Process each image in the array
            item.images.forEach((img: any, index: number) => {
              formattedPhotos.push({
                id: `${item._id}-${index}`, // Create unique ID for each image
                title: `${categoryData.title} Photo`,
                url: urlFor(img).url()
              });
            });
          } else if (item.image && Array.isArray(item.image)) {
            // Support legacy field name if needed
            item.image.forEach((img: any, index: number) => {
              formattedPhotos.push({
                id: `${item._id}-${index}`,
                title: `${categoryData.title} Photo`,
                url: urlFor(img).url()
              });
            });
          } else if (item.image) {
            // Single image case
            formattedPhotos.push({
              id: item._id,
              title: `${categoryData.title} Photo`,
              url: urlFor(item.image).url()
            });
          }
        });
        
        setPhotos(formattedPhotos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos:', error);
        setError('Failed to load photos. Please try again later.');
        setLoading(false);
      }
    }
    
    fetchPhotos();
  }, [slug]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentIndex(photos.findIndex(p => p.id === photo.id));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedPhoto) return;

    if (e.key === 'ArrowLeft') {
      navigatePhotos('prev');
    } else if (e.key === 'ArrowRight') {
      navigatePhotos('next');
    } else if (e.key === 'Escape') {
      setSelectedPhoto(null);
    }
  };

  const navigatePhotos = (direction: 'prev' | 'next') => {
    let newIndex = currentIndex;
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    }
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, selectedPhoto]);

  if (loading) {
    return (
      <LoadingSpinner contentType="photos"/>      
    );
  }

  if (error) {
    return (
      <div className="w-full px-5 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="w-full px-5 py-8">
        <h1 className="text-3xl font-bold mb-4">{categoryTitle || 'Category'}</h1>
        <p>No photos found in this category. Please add some photos in the Sanity Studio.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-5 pt-mobile-block pb-mobile-block md:pt-desktop-block md:pb-desktop-block">
      {categoryTitle && (
        <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="cursor-pointer hover:opacity-90 transition-opacity rounded-lg overflow-hidden h-80"
            onClick={() => handlePhotoClick(photo)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <button
            onClick={() => navigatePhotos("prev")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="max-w-4xl w-full bg-white rounded-xl overflow-hidden relative">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-auto"
            />
            <div className="p-4 bg-white">
              <h2 className="text-xl font-semibold">{selectedPhoto.title}</h2>
            </div>
          </div>
          <button
            onClick={() => navigatePhotos("next")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white"
          >
            <ChevronRight size={24} />
          </button>
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};


export default CategoryGrid;