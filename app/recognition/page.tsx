// app/recognition/page.tsx
import GalleryHero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import RecognitionGrid from '@/app/recognition/RecognitionGrid';

export default function RecognitionPage() {
  return (
    <>
      <GalleryHero title="Recognition" backgroundImage="/recognition-banner.jpg" />

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
      
      <RecognitionGrid />
    </>
  );
}