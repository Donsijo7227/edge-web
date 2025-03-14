// app/gallery/page.tsx
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GalleryHero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Link from 'next/link';

export default function GalleryPage() {
  return (
    <>
      <GalleryHero title="Gallery" backgroundImage="/images/gallery-banner.jpg" />

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-4">
                <NextBreadcrumb 
                    homeElement={<span>Home</span>}
                    separator={<span className="mx-2">&gt;</span>}
                    containerClasses="flex items-center text-[#123800]"
                    listClasses="hover:underline"
                    activeClasses="font-semibold no-underline"
                    capitalizeLinks={true}
                />
      </div>
      <GalleryGrid />
    </>
  );
}