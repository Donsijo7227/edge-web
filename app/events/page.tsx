// app/events/page.tsx
import EventGrid from '@/components/events/EventGrid';
import GalleryHero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <>
      <GalleryHero title="Events" backgroundImage="/events-banner.jpg" />

      {/* Breadcrumbs */}
      <div className="w-full px-5 pt-4">
        <div className="flex items-center text-gray-600 flex-wrap">
          <NextBreadcrumb
            homeElement={<span className="text-green-700 hover:underline">Home</span>}
            separator={<span className="mx-1 text-gray-500"> &gt; </span>}
            activeClasses="text-gray-800"
            containerClasses="flex items-center flex-wrap"
            listClasses="text-green-700 hover:underline"
            capitalizeLinks
          />
        </div>
      </div>
      
      <EventGrid />
    </>
  );
}