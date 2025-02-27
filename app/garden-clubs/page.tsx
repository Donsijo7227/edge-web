'use client';

import NavBar from "@/components/navBar";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import Hero from "@/components/hero";
import Link from "next/link";
import Image from "next/image";

export default function GardenClubsPage() {
  // List of garden clubs with their links (updated with correct URLs)
  const gardenClubs = [
    {
      name: "Ontario Horticultural Association",
      link: "https://gardenontario.org/"
    },
    {
      name: "The Garden Club of Toronto",
      link: "https://gct.clubexpress.com/" 
    },
    {
      name: "Waterloo Horticultural Society",
      link: "https://www.waterloohort.org/" 
    },
    {
      name: "The Garden Club of London",
      link: "https://gardencluboflondon.ca/" 
    },
    {
      name: "The Georgian Bay Garden Club",
      link: "https://georgianbaygardenclubowensound.com/" 
    },
    {
      name: "The Ottawa Garden Club",
      link: "https://www.ogc.website/" 
    }
  ];

  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <Hero 
          title="Garden Clubs" 
          backgroundImage="/images/garden-clubs-hero.jpg" 
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

        {/* Garden Clubs Section */}
        <section className="py-8 px-4 content-block">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-stretch">
              {/* Left side image - now with height: 100% to fill the container */}
              <div className="w-full md:w-2/5 mb-6 md:mb-0 md:pr-6 flex flex-col">
                <div className="rounded-lg overflow-hidden h-full flex">
                  <div className="relative w-full h-full" style={{ minHeight: "450px" }}>
                    <Image 
                      src="/images/garden-clubs-detail.jpg" 
                      alt="Garden plants" 
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Right side links */}
              <div className="w-full md:w-3/5 flex flex-col">
                <div className="space-y-6 h-full flex flex-col justify-between">
                  {gardenClubs.map((club, index) => (
                    <Link 
                      key={index}
                      href={club.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center py-3 px-2 hover:bg-[#f5f9f1] rounded-lg transition-colors group"
                    >
                      <div className="flex-shrink-0 mr-4">
                        <Image 
                          src="/images/leaf.png" 
                          alt="Leaf icon" 
                          width={48} 
                          height={48}
                          className="w-12 h-12"
                        />
                      </div>
                      <span className="font-heading text-h3 text-[#123800] group-hover:text-[#123800]/80">
                        {club.name}
                      </span>
                      <div className="ml-auto">
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#123800]"
                        >
                          <path 
                            d="M5 12H19M19 12L12 5M19 12L12 19" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}