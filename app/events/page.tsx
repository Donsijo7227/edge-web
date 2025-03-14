// app/events/page.tsx
import EventGrid from '@/components/events/EventGrid';
import GalleryHero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <>
      <GalleryHero title="Events" backgroundImage="/events-banner.jpg" />

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
      
      <EventGrid />
    </>
  );
}