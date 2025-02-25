// app/gallery/[slug]/page.tsx

import CategoryGrid from '@/components/gallery/CategoryGrid';
import GalleryHero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Link from 'next/link';

interface Props {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: Props) {
  return (
    <>
    <GalleryHero title="Gallery" backgroundImage="/gallery-banner.jpg" />

    {/* Breadcrumbs */}
    <div className="max-w-7xl mx-auto px-6 mt-4">
    <div className="flex items-center text-gray-600 flex-wrap">
      <NextBreadcrumb
        homeElement={<Link href="/" className="text-green-700 hover:underline">Home</Link>}
        separator={<span className="mx-1 text-gray-500"> &gt; </span>}
        activeClasses="text-gray-800"
        containerClasses="flex items-center flex-wrap"
        listClasses="text-green-700 hover:underline"
        capitalizeLinks
      />
      </div>
    </div>
    <CategoryGrid />
  </>
  )
  
  
  ;
}