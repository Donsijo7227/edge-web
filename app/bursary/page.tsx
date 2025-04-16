'use client';

import { useState, useEffect, ReactElement } from "react";
import Image from "next/image";
import Hero from "@/components/hero";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import Link from "next/link";
import { PortableText } from '@portabletext/react';
import { getBursaryPageData } from "@/sanity/lib/queries"; // Adjust path as needed

// Define types for the data structure
interface Step {
  stepTitle: string;
  stepImage: string;
  stepDescription: any;
}

interface ApplicationStep {
  _id: string;
  title: string;
  bursaryId: string;
  bursaryTitle: string;
  steps: Step[];
  applicationUrl?: string;
  isInternalApplication?: boolean;
  showApplyButton?: boolean;
  order: number;
}

interface Bursary {
  _id: string;
  title: string;
  description: any;
  website?: string;
  contactPerson?: string;
  contactEmail?: string;
  order: number;
}

interface ImportantDate {
  _id: string;
  month: string;
  day: number;
  description: string;
  order: number;
}

interface PageData {
  title: string;
  introduction: any;
}

interface BursaryPageData {
  pageData: PageData;
  bursaries: Bursary[];
  applicationSteps: ApplicationStep[];
  importantDates: ImportantDate[];
}

export default function Bursary() {
    const [expandedBursary, setExpandedBursary] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [pageData, setPageData] = useState<BursaryPageData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBursaryPageData();
                setPageData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bursary data:", error);
                setError("Failed to load bursary information. Please try again later.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Check if we're on mobile view
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        checkIfMobile();
        
        // Set up event listener for window resize
        window.addEventListener('resize', checkIfMobile);
        
        // Clean up
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const toggleBursary = (bursaryId: string) => {
        if (expandedBursary === bursaryId) {
            setExpandedBursary(null);
        } else {
            setExpandedBursary(bursaryId);
        }
    };

    // Helper to find application steps for a specific bursary
    const getApplicationStepsForBursary = (bursaryId: string): ApplicationStep | undefined => {
        if (!pageData?.applicationSteps) return undefined;
        
        return pageData.applicationSteps.find(
            (s) => s.bursaryId === bursaryId
        );
    };

    // Helper to render application button based on application step settings
    const renderApplicationButton = (appStep: ApplicationStep | undefined) => {
        if (!appStep || !appStep.applicationUrl || !appStep.showApplyButton) {
            return null;
        }

        return (
            <div className="mt-6 flex justify-center">
                <Link 
                    href={appStep.applicationUrl}
                    target={!appStep.isInternalApplication ? "_blank" : undefined}
                    rel={!appStep.isInternalApplication ? "noopener noreferrer" : undefined}
                    className="px-6 py-3 bg-edge-green-dark text-white font-medium rounded-md hover:opacity-90 transition-colors"
                >
                    {appStep.isInternalApplication ? "Apply Now" : "Apply at External Site"}
                </Link>
            </div>
        );
    };

    // Sort important dates by order (should already be sorted from query)
    const sortedDates = pageData?.importantDates || [];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-2xl text-edge-green-dark">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-2xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
      <>
        {/* Hero Component - Using hardcoded values as requested */}
        <Hero
          title="Bursary"
          backgroundImage="/images/bursary-hero-banner.jpg"
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

        {/* Introduction Section */}
        <div className="container mx-auto px-4  content-block">
          <h2 className="heading-2 text-edge-green-dark mb-4">Introduction</h2>
          <div>
            {pageData?.pageData?.introduction ? (
              <PortableText value={pageData.pageData.introduction} />
            ) : (
              // Fallback to hardcoded content if no Sanity data
              <p className="body-text text-black mb-4">
                E.D.G.E is proud to support students in their academic journeys by
                offering this scholarship as a testament to our commitment to
                education, innovation, and personal growth. We believe that
                every student deserves the opportunity to pursue their dreams
                without financial barriers holding them back. We hope
                that this scholarship not only provides financial relief but
                also serves as motivation, reminding students that their efforts
                are seen, valued, and supported. E.D.G.E remains committed to fostering a culture of
                learning and excellence, and we look forward to seeing how our
                scholarship recipients make a lasting impact in their fields and
                communities.
              </p>
            )}
          </div>
        </div>

        {/* Bursaries Section */}
        <div className="container mx-auto px-4 content-block">
          <h2 className="heading-2 text-edge-green-dark mb-6">Bursaries</h2>

          {isMobile ? (
            // Mobile view - Collapsible sections
            <div className="space-y-4">
              {pageData?.bursaries?.map((bursary) => (
                <div
                  key={bursary._id}
                  className="border border-edge-green-dark rounded-md overflow-hidden font-bakbak"
                >
                  <button
                    className="w-full bg-edge-green-primary text-black p-4 text-left flex justify-between items-center font-heading"
                    onClick={() => toggleBursary(`bursary-${bursary._id}`)}
                  >
                    <span>{bursary.title}</span>
                    <span
                      className={`text-2xl transition-transform duration-200 ${expandedBursary === `bursary-${bursary._id}` ? "rotate-90" : ""}`}
                    >
                      &gt;
                    </span>
                  </button>

                  {expandedBursary === `bursary-${bursary._id}` && (
                    <div className="p-4 bg-edge-green-secondary">
                      <div className="body-text text-black">
                        <PortableText value={bursary.description} />
                      </div>
                      <div className="text-sm text-black mt-4">
                        {bursary.website && (
                          <p className="mb-2">
                            For more details, visit{" "}
                            <Link href={bursary.website} className="underline">
                              {bursary.website}
                            </Link>
                          </p>
                        )}
                        {(bursary.contactPerson || bursary.contactEmail) && (
                          <p>
                            Contact:{" "}
                            {bursary.contactPerson && (
                              <span>{bursary.contactPerson}</span>
                            )}
                            {bursary.contactEmail && (
                              <>
                                {" "}
                                -{" "}
                                <Link
                                  href={`mailto:${bursary.contactEmail}`}
                                  className="underline"
                                >
                                  {bursary.contactEmail}
                                </Link>
                              </>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Desktop view - Side by side grid
            <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
              {pageData?.bursaries?.map((bursary) => (
                <div
                  key={bursary._id}
                  className="border border-edge-green-dark rounded-lg overflow-hidden flex flex-col h-full"
                >
                  <div className="p-4 bg-edge-green-dark text-white heading-3">
                    {bursary.title}
                  </div>
                  <div className="bg-edge-green-secondary text-black p-4 flex-grow">
                    <PortableText value={bursary.description} />
                    <div className="text-sm text-black mt-4">
                      {bursary.website && (
                        <p className="mb-2">
                          For more details, visit{" "}
                          <Link href={bursary.website} className="underline">
                            {bursary.website}
                          </Link>
                        </p>
                      )}
                      {(bursary.contactPerson || bursary.contactEmail) && (
                        <p>
                          Contact:{" "}
                          {bursary.contactPerson && (
                            <span>{bursary.contactPerson}</span>
                          )}
                          {bursary.contactEmail && (
                            <>
                              {" "}
                              -{" "}
                              <Link
                                href={`mailto:${bursary.contactEmail}`}
                                className="underline"
                              >
                                {bursary.contactEmail}
                              </Link>
                            </>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How to Apply Section */}
        <div className="container mx-auto px-4 content-block">
          <h2 className="heading-2 text-edge-green-dark mb-6">How to Apply</h2>

          {isMobile ? (
            // Mobile view - Each bursary has its own toggle section
            <div className="space-y-4">
              {pageData?.bursaries?.map((bursary) => {
                const appStep = getApplicationStepsForBursary(bursary._id);
                if (!appStep || !appStep.steps || appStep.steps.length === 0)
                  return null;

                return (
                  <div
                    key={`apply-${bursary._id}`}
                    className="border border-edge-green-dark rounded-md overflow-hidden"
                  >
                    <button
                      className="w-full bg-edge-green-dark text-white p-4 text-left flex justify-between items-center font-heading"
                      onClick={() => toggleBursary(`apply-${bursary._id}`)}
                    >
                      <span>{bursary.title}</span>
                      <span
                        className={`text-2xl transition-transform duration-200 ${expandedBursary === `apply-${bursary._id}` ? "rotate-90" : ""}`}
                      >
                        &gt;
                      </span>
                    </button>

                    {expandedBursary === `apply-${bursary._id}` && (
                      <div className="p-4 bg-white">
                        <div className="space-y-8">
                          {appStep.steps.map((step, stepIndex) => (
                            <div
                              key={stepIndex}
                              className="flex items-start space-x-6"
                            >
                              <div className="flex-shrink-0">
                                <Image
                                  src={
                                    step.stepImage ||
                                    "/images/application-1.jpg"
                                  }
                                  alt={step.stepTitle}
                                  width={80}
                                  height={80}
                                  className="rounded-md"
                                />
                              </div>
                              <div>
                                <h4 className="heading-3 text-edge-green-dark mb-2">
                                  {step.stepTitle}
                                </h4>
                                <PortableText value={step.stepDescription} />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Application Link - Mobile */}
                        {renderApplicationButton(appStep)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // Desktop view - Two column layout
            <div>
              <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
                {pageData?.bursaries?.map((bursary) => {
                  // Only show bursaries that have application steps
                  const appStep = getApplicationStepsForBursary(bursary._id);
                  if (!appStep || !appStep.steps || appStep.steps.length === 0)
                    return null;

                  return (
                    <div
                      key={`steps-${bursary._id}`}
                      className="border border-edge-green-dark rounded-lg overflow-hidden flex flex-col h-full"
                    >
                      <div className="bg-edge-green-dark text-white p-4 font-heading text-h3">
                        {bursary.title}
                      </div>
                      <div className="p-6 bg-white text-black space-y-8 flex-grow">
                        {appStep.steps.map((step, stepIndex) => (
                          <div
                            key={stepIndex}
                            className="flex items-start space-x-6"
                          >
                            <div className="flex-shrink-0">
                              <Image
                                src={
                                  step.stepImage || "/images/application-1.jpg"
                                }
                                alt={step.stepTitle}
                                width={80}
                                height={80}
                                className="rounded-md"
                              />
                            </div>
                            <div>
                              <h4 className="heading-3 text-edge-green-dark mb-2">
                                {step.stepTitle}
                              </h4>
                              <PortableText value={step.stepDescription} />
                            </div>
                          </div>
                        ))}

                        {/* Application Link - Desktop */}
                        {renderApplicationButton(appStep)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Important Dates Section */}
        <div className="container mx-auto px-4 content-block">
          <h2 className="heading-2 text-edge-green-dark mb-6">
            Important Dates
          </h2>

          <div className="space-y-3">
            {sortedDates.map((date) => (
              <div
                key={date._id}
                className="grid grid-cols-[96px_1fr] bg-edge-green-secondary rounded-md overflow-hidden"
              >
                <div className="bg-edge-green-primary flex flex-col items-center justify-center py-4">
                  <div className="text-s uppercase tracking-wider text-edge-green-dark">
                    {date.month}
                  </div>
                  <div className="text-body font-bold text-edge-green-dark">
                    {date.day}
                  </div>
                </div>
                <div className="p-4 flex items-center">
                  <p className="text-black">{date.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );

}