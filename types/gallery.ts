// types/gallery.ts

export interface Category {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    slug: string;
  }
  
  export interface Photo {
    id: number;
    url: string;
    title: string;
  }