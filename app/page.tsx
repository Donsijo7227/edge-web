import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/navBar";
import ContactSection from "@/components/contactsection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen">
        {/* Hero section */}
        <section className="relative h-screen bg-edge-green-primary bg-opacity-30">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/herobanner.jpg" 
              alt="Plants background" 
              fill 
              className="object-cover"
              priority 
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-12 h-full flex flex-col">
            <div className="flex-1 flex flex-col justify-center max-w-2xl">
              <h1 className="title text-white mb-4">Find Your Peace at the EDGE of Nature</h1>
              <p className="body-text text-white mb-6">
                We are a non-profit organization dedicated to educating and promoting all branches of horticulture. Through civic beautification, tree planting, and environmental education, we inspire communities to cultivate a greener, more vibrant future. Join us in making a lasting impact!
              </p>
              <Link 
                href="#learn-more" 
                className="bg-edge-green-primary text-edge-green-dark px-6 py-3 rounded-md font-heading font-bold inline-block w-max hover:bg-opacity-90 transition-colors"
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>

        {/* Welcome section */}
        <section id="learn-more" className="py-16 px-4 content-block">
          <div className="container mx-auto">
            <h2 className="heading-2 mb-8 text-[#123800]">Welcome to Our Club</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <p className="body-text">
                  Welcome to a community where a love for plants, nature, and environmental stewardship brings people together! Our club is dedicated to educating, inspiring, and supporting individuals who share a passion for horticulture, whether you're an experienced gardener or just starting your journey.
                </p>
              </div>
              <div className="space-y-4">
                <p className="body-text">
                  We offer a welcoming space for learning and connection, with hands-on workshops, expert-led lectures, and community projects that promote sustainable gardening practices and civic beautification. From planting trees and flowers to advocating for environmental protection, we believe in the power of greenery to transform our surroundings and enrich our lives.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 w-full">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/images/column-image-1.jpg" 
                  alt="Garden image" 
                  className="w-full h-auto max-h-[342px] object-cover rounded-lg"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/images/column-image-2.jpg" 
                  alt="Garden image" 
                  className="w-full h-auto max-h-[342px] object-cover rounded-lg"
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/images/column-image-3.jpg" 
                  alt="Garden image" 
                  className="w-full h-auto max-h-[342px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Become a Member section */}
        <section className="py-16 px-4 bg-[#a8d080] content-block">
          <div className="container mx-auto">
            <h2 className="heading-2 mb-8 text-[#123800]">Become a Member</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-4">
              <div className="space-y-4">
                <p className="body-text">
                  Join our growing community of plant enthusiasts, gardeners, and environmental advocates! As a member, you’ll have the opportunity to deepen your knowledge of horticulture, participate in hands-on gardening projects, and contribute to meaningful initiatives that beautify our communities.
                </p>
              </div>
              <div className="space-y-4">
                <p className="body-text">
                  Membership offers exclusive access to workshops, expert-led lectures, and special events focused on sustainable gardening, conservation, and civic beautification. Whether you're looking to enhance your gardening skills, meet like-minded individuals, or make a positive impact on the environment, our club provides a supportive and inspiring space to grow.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Link 
                href="#" 
                className="inline-flex items-center text-edge-green-dark font-medium"
              >
                <span className="mr-2">Learn more</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Us section with new layout */}
        <section className="py-16 px-4 content-block">
          <div className="container mx-auto">
            {/* Heading in its own row */}
            <h2 className="heading-2 mb-8 text-[#123800]">Contact Us</h2>
            
            {/* Form and image in a row */}
            <div className="flex flex-col md:flex-row md:gap-8">
              {/* Contact form - passing hideHeading to avoid duplicate heading */}
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <ContactSection hideHeading={true} />
              </div>
              
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative w-full h-96 md:h-full min-h-[500px]">
                  <Image 
                    src="/images/contact-plants.jpg" 
                    alt="Succulent plants collection" 
                    fill
                    className="rounded-lg object-cover"
                    style={{ objectPosition: 'center' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}