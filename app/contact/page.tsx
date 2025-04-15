'use client';
import ContactSection from "@/components/contactsection";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import Hero from "@/components/hero";

export default function ContactPage() {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <Hero
          title="Contact Us"
          backgroundImage="/images/contact-us-hero-banner.jpg"
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

        {/* Organization Info Section - Updated Layout */}
        <section className="py-8 px-4 content-block">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              {/* Left side - Organization info */}
              <div>
                <h2 className="heading-2 text-edge-text mb-mobile-block md:mb-4">
                  Elmvale District Garden Enthusiasts - EDGE
                </h2>

                <div className="mb-mobile-block md:mb-4">
                  <p className="heading-3 text-[#123800] mb-1">
                    Email: edgeelmvale@gmail.com
                  </p>
                </div>

                <div className="mb-mobile-block md:mb-6">
                  <p className="heading-3 text-[#123800]">
                    Address: 123 Street Name, Elmvale, ON A1B CD2
                  </p>
                </div>
              </div>

              {/* Right side - Social Media */}
              <div className="bg-[#b8d78e] p-6 rounded-lg mb-8 md:mb-0 w-full md:w-auto md:min-w-[350px]">
                <p className="heading-3 text-[#123800] mb-4">Follow us on</p>
                <div className="flex justify-center space-x-8">
                  <a href="#" className="text-4xl text-[#123800]">
                    <span className="sr-only">Facebook</span>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.762v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.675V1.325C24 .593 23.406 0 22.675 0z" />
                    </svg>
                  </a>

                  <a href="#" className="text-4xl text-[#123800]">
                    <span className="sr-only">Instagram</span>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Section with Map and Form in a Row */}
            <div className="flex flex-col md:flex-row md:gap-8">
              {/* Map on the left - no border */}
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <div className="h-96 md:h-full rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14379.312934420264!2d-79.87097287580241!3d44.59066236069193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4d2ac71eda947c47%3A0x5037b28c7232580!2sElmvale%2C%20ON!5e0!3m2!1sen!2sca!4v1668295788209!5m2!1sen!2sca"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Contact form on the right */}
              <div className="w-full md:w-1/2">
                <ContactSection hideHeading={true} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );



}