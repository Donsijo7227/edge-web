'use client';

import NavBar from "@/components/navBar";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import Hero from "@/components/hero";
import Link from "next/link";
import Image from "next/image";

export default function ResourcesPage() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <Hero 
          title="Resources" 
          backgroundImage="/images/resources-hero-banner.jpg" 
        />

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

        {/* Resource Cards Section */}
        <section className="py-8 px-4 content-block">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* recognition Card */}
              <Link href="/recognition" className="block">
                <div className="rounded-lg overflow-hidden border-2 border-[#123800] transition-transform hover:scale-[1.01]">
                  <div className="relative aspect-[16/9] w-full">
                    <Image 
                      src="/images/news.jpg" 
                      alt="EDGE News" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                    <h2 className="absolute bottom-4 left-4 text-white font-heading text-h2">
                      Recognition
                    </h2>
                  </div>
                </div>
              </Link>

              {/* Projects Card */}
              <Link href="/projects" className="block">
                <div className="rounded-lg overflow-hidden border-2 border-[#123800] transition-transform hover:scale-[1.01]">
                  <div className="relative aspect-[16/9] w-full">
                    <Image 
                      src="/images/projects.jpg" 
                      alt="EDGE Projects" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                    <h2 className="absolute bottom-4 left-4 text-white font-heading text-h2">
                      Projects
                    </h2>
                  </div>
                </div>
              </Link>

              {/* Gallery Card */}
              <Link href="/gallery" className="block">
                <div className="rounded-lg overflow-hidden border-2 border-[#123800] transition-transform hover:scale-[1.01]">
                  <div className="relative aspect-[16/9] w-full">
                    <Image 
                      src="/images/gallery.jpg" 
                      alt="EDGE Gallery" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                    <h2 className="absolute bottom-4 left-4 text-white font-heading text-h2">
                      Gallery
                    </h2>
                  </div>
                </div>
              </Link>

              {/* Garden Clubs Card */}
              <Link href="/garden-clubs" className="block">
                <div className="rounded-lg overflow-hidden border-2 border-[#123800] transition-transform hover:scale-[1.01]">
                  <div className="relative aspect-[16/9] w-full">
                    <Image 
                      src="/images/garden-clubs.jpg" 
                      alt="Garden Clubs" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                    <h2 className="absolute bottom-4 left-4 text-white font-heading text-h2">
                      Garden Clubs
                    </h2>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}