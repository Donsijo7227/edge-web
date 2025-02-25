// components/gallery/CategoryGrid.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '@/types/gallery';

const photos: Photo[] = [
  { id: 1, url: "/individual-image-2.jpg", title: "Sample Photo 1" },
  { id: 2, url: "/individual-image-3.jpg", title: "Sample Photo 2" },
  { id: 3, url: "/api/placeholder/800/600", title: "Sample Photo 3" },
  { id: 4, url: "/api/placeholder/800/600", title: "Sample Photo 4" },
  { id: 5, url: "/api/placeholder/800/600", title: "Sample Photo 5" },
  { id: 6, url: "/api/placeholder/800/600", title: "Sample Photo 6" }
];

const CategoryGrid: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="cursor-pointer hover:opacity-90 transition-opacity rounded-xl overflow-hidden"
            onClick={() => handlePhotoClick(photo)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <button
            onClick={() => navigatePhotos('prev')}
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
            onClick={() => navigatePhotos('next')}
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