// app/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { groq } from 'next-sanity';
import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';
import { SanityDocument } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import Hero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import TextSection from '@/components/sections/TextSection';
import ImageGallerySection from '@/components/sections/ImageGallerySection';
// Import the image URL builder
import imageUrlBuilder from '@sanity/image-url';

// Create the image URL builder
const builder = imageUrlBuilder(client);

// Helper function to get image URLs
function urlFor(source: any) {
  return builder.image(source);
}

// Define interfaces for our content types
interface PageData extends SanityDocument {
  title: string;
  slug: { current: string };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    shareImage?: any;
  };
  content: any[];
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const draftModeData = await draftMode();
  const isDraftMode = draftModeData.isEnabled;
 
  const query = groq`*[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    seo
  }`;
 
  const page = await client.fetch<PageData | null>(
    query, 
    { slug },
    { next: { tags: [`page:${slug}`] }, ...(isDraftMode ? { cache: 'no-store' } : {}) }
  );
 
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.'
    };
  }
 
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    openGraph: page.seo?.shareImage ? {
      images: [{ url: urlFor(page.seo.shareImage).url() }]
    } : undefined
  };
}

// Generate static paths for all pages
export async function generateStaticParams() {
  const query = groq`*[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }`;
 
  const pages = await client.fetch<{ slug: string }[]>(query);
 
  return pages.map((page) => ({
    slug: page.slug
  }));
}

// Component that renders different section types
const SectionComponent = ({ section }: { section: any }) => {
  // Choose the right component based on section type
  switch (section._type) {
    case 'textSection':
      return <TextSection section={section} />;
    case 'imageGallerySection':
      return <ImageGallerySection section={section} />;
    default:
      console.warn(`Section type not supported: ${section._type}`);
      return null;
  }
};

// Main page component
export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const draftModeData = await draftMode();
  const isDraftMode = draftModeData.isEnabled;
 
  const query = groq`*[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    content
  }`;
 
  const page = await client.fetch<PageData | null>(
    query, 
    { slug },
    { next: { tags: [`page:${slug}`] }, ...(isDraftMode ? { cache: 'no-store' } : {}) }
  );
 
  if (!page) {
    notFound();
  }
 
  return (
    <>
      {/* Hero Component */}
      <Hero
        title={page.title}
        backgroundImage="/images/default-page-banner.jpg"
      />
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-4">
        <NextBreadcrumb
          homeElement={<span>Home</span>}
          separator={<span className="mx-2">/</span>}
          containerClasses="flex items-center text-edge-green-dark"
          listClasses="hover:underline"
          activeClasses="font-semibold no-underline"
          capitalizeLinks={true}
        />
      </div>
     
      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {page.content && page.content.map((section, index) => (
          <div key={section._key || index} className="mb-12">
            <SectionComponent section={section} />
          </div>
        ))}
      </div>
    </>
  );
}