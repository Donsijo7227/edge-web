// components/sections/ImageGallerySection.tsx
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

// Create an image URL builder
const builder = imageUrlBuilder(client);

// Define proper types
interface SanityAsset {
  _ref: string;
  _type?: string;
}

interface SanityImage {
  _key: string;
  asset: SanityAsset;
  alt: string;
  caption?: string;
}

interface ImageGallerySectionProps {
  section: {
    heading?: string;
    subheading?: string;
    images: SanityImage[];
    layout: 'grid' | 'carousel' | 'masonry';
  };
}

export default function ImageGallerySection({ section }: ImageGallerySectionProps) {
  // Helper function to get image URL
  const getImageUrl = (image: SanityImage) => {
    // Use the builder directly with the asset
    return builder.image(image.asset).url();
  };

  // Render different layouts
  const renderGallery = () => {
    switch (section.layout) {
      case 'carousel':
        return (
          <div className="relative overflow-hidden">
            <div className="flex overflow-x-auto pb-4 space-x-4">
              {section.images.map((image, index) => (
                <div key={image._key || index} className="flex-shrink-0 w-80">
                  <div className="relative aspect-video">
                    <Image 
                      src={getImageUrl(image)} 
                      alt={image.alt}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  {image.caption && (
                    <p className="mt-2 text-sm text-gray-600">{image.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'masonry':
        return (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {section.images.map((image, index) => (
              <div key={image._key || index} className="mb-4 break-inside-avoid">
                <div className="relative">
                  <Image 
                    src={getImageUrl(image)} 
                    alt={image.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-md"
                  />
                </div>
                {image.caption && (
                  <p className="mt-2 text-sm text-gray-600">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        );
        
      case 'grid':
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {section.images.map((image, index) => (
              <div key={image._key || index} className="group">
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image 
                    src={getImageUrl(image)} 
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                {image.caption && (
                  <p className="mt-2 text-sm text-gray-600">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        );
    }
  };
  
  return (
    <div>
      {section.heading && (
        <h2 className="heading-2 text-edge-green-dark mb-4">{section.heading}</h2>
      )}
      
      {section.subheading && (
        <p className="text-lg text-gray-600 mb-6">{section.subheading}</p>
      )}
      
      {section.images && renderGallery()}
    </div>
  );
}