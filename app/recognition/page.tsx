// app/recognition/page.tsx
import GalleryHero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import RecognitionGrid from '@/app/recognition/RecognitionGrid';

export default function RecognitionPage() {
  return (
    <>
      <GalleryHero title="Recognition" backgroundImage="/recognition-banner.jpg" />

      {/* Breadcrumbs */}
      <div className="w-full px-5 pt-4">
        <div className="flex items-center text-edge-text flex-wrap">
          <NextBreadcrumb
            homeElement={<span className="text-edge-green-dark hover:underline">Home</span>}
            separator={<span className="mx-1 text-edge-text"> &gt; </span>}
            activeClasses="text-edge-text"
            containerClasses="flex items-center flex-wrap"
            listClasses="text-edge-green-dark hover:underline font-zain"
            capitalizeLinks
          />
        </div>
      </div>
      
      <RecognitionGrid />
    </>
  );
}