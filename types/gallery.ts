// types/gallery.ts
export interface Category {
  id: string | number;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
}

export interface Photo {
  id: string | number;
  url: string;
  title: string;
  description?: string;
}

// Sanity specific types 
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}