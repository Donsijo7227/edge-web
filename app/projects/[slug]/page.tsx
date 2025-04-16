// app/projects/[slug]/page.tsx
import ProjectDetail from '@/components/projects/ProjectDetail';
import GalleryHero from '@/components/hero';
import NextBreadcrumb from '@/components/NextBreadcrumb';
import Link from 'next/link';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const slug = params.slug;

  return (
    <>
      <GalleryHero title="Projects" backgroundImage="/images/project-banner.jpg" />

      {/* Breadcrumbs */}
      <div className="w-full px-5 pt-4">
        <div className="flex items-center text-gray-600 flex-wrap">
        <NextBreadcrumb
            homeElement={<span className="text-edge-green-dark hover:underline">Home</span>}
            separator={<span className="mx-1 text-edge-text"> &gt; </span>}
            activeClasses="text-edge-text font-bold" // Added font-bold here
            containerClasses="flex items-center flex-wrap"
            listClasses="text-edge-green-dark hover:underline font-zain"
            capitalizeLinks
        />
        </div>
      </div>
      
      <ProjectDetail slug={slug} />
    </>
  );
}