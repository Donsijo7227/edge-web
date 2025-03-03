'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "@/components/navBar";
import Hero from "@/components/hero";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import Link from "next/link";

export default function Bursary() {
    const [expandedBursary, setExpandedBursary] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [selectedSchool, setSelectedSchool] = useState<string>('local'); // Default to local high school

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

    return (
        <>
            {/* Navigation Bar */}
            <NavBar />

            {/* Hero Component */}
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
            <div className="container mx-auto px-4 py-6 content-block">
                <h2 className="heading-2 text-edge-green-dark mb-4">Introduction</h2>
                <div>
                    <p className="body-text text-black mb-4">
                        Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto. Et velit esse vel perferendis recusandae quo architecto odit aut quos minima. Non voluptas aperiam et dolorem voluptas ea reiciendis et provident enim est ut.
                    </p>
                    <p className="body-text text-black">
                        Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto. Et velit esse vel perferendis recusandae quo architecto odit aut quos minima. Non voluptas aperiam et dolorem voluptas ea reiciendis et provident enim est ut.
                    </p>
                </div>
            </div>

            {/* Bursaries Section */}
            <div className="container mx-auto px-4 py-6 content-block ">
                <h2 className="heading-2 text-edge-green-dark mb-6">Bursaries</h2>
                
                {isMobile ? (
                    // Mobile view - Collapsible sections
                    <div className="space-y-4">
                        {/* Local High School Annual Bursary */}
                        <div className="border border-edge-green-dark rounded-md overflow-hidden font-bakbak ">
                            <button 
                                className="w-full bg-edge-green-primary text-black p-4 text-left flex justify-between items-center font-heading"
                                onClick={() => toggleBursary('local')}
                            >
                                <span>Local High School Annual Bursary</span>
                                <span className={`text-2xl transition-transform duration-200 ${expandedBursary === 'local' ? 'rotate-90' : ''}`}>&gt;</span>
                            </button>
                            
                            {expandedBursary === 'local' && (
                                <div className="p-4 bg-edge-green-secondary">
                                    <p className="body-text mb-4 text-black">
                                        Our local high school offers an annual bursary to support graduating students pursuing post-secondary education. This bursary is awarded based on academic achievement, community involvement, and financial need.
                                    </p>
                                    <p className="body-text text-black">
                                        Students must complete an application form, provide a personal statement, and submit supporting documents, including transcripts and letters of recommendation. Applications can be obtained from the school's guidance office or online at abc.com.
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        {/* District 16's Dr. Ives Bursary */}
                        <div className="border border-edge-green-dark rounded-md overflow-hidden">
                            <button 
                                className="w-full bg-edge-green-primary text-black p-4 text-left flex justify-between items-center font-heading"
                                onClick={() => toggleBursary('ives')}
                            >
                                <span>District 16's Dr. Ives Bursary</span>
                                <span className={`text-2xl transition-transform duration-200 ${expandedBursary === 'ives' ? 'rotate-90' : ''}`}>&gt;</span>
                            </button>
                            
                            {expandedBursary === 'ives' && (
                                <div className="p-4 bg-edge-green-secondary">
                                    <p className="body-text mb-4 text-black">
                                        The Dr. Ives Bursary, established by District 16, supports students entering post-secondary studies in fields related to healthcare, science, or community service, and honors Dr. Ives' contributions to education and public health.
                                    </p>
                                    <p className="body-text mb-4 text-black">
                                        Candidates must be actively outlining their educational goals, proof of enrollment in a post-secondary institution, and references. Applications are available through the District 16 website or local school offices.
                                    </p>
                                    <p className="text-sm text-black">
                                        For more details, visit <Link href="#" className="underline">Insert Website</Link> or contact <Link href="#" className="underline">Insert Contact Information</Link>.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Desktop view - Side by side grid
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Local High School Annual Bursary */}
                        <div className="bg-edge-green-dark text-white rounded-lg overflow-hidden">
                            <div className="p-4 heading-3">Local High School Annual Bursary</div>
                            <div className="bg-edge-green-secondary text-edge-green-dark p-4 border-2 border-edge-green-dark">
                                <p className="body-text mb-4 text-black">
                                    Our local high school offers an annual bursary to support graduating students pursuing post-secondary education. This bursary is awarded based on academic achievement, community involvement, and financial need.
                                </p>
                                <p className="body-text mb-4 text-black">
                                    Students must complete an application form, provide a personal statement, and submit supporting documents, including transcripts and letters of recommendation. Applications can be obtained from the school's guidance office or online at abc.com.
                                </p>
                            </div>
                        </div>

                        {/* District 16's Dr. Ives Bursary */}
                        <div className="bg-edge-green-dark text-white rounded-lg overflow-hidden">
                            <div className="p-4 heading-3">District 16's Dr. Ives Bursary</div>
                            <div className="bg-edge-green-secondary text-edge-green-dark p-4 border-2 border-edge-green-dark">
                                <p className="body-text mb-4 text-black">
                                    The Dr. Ives Bursary, established by District 16, supports students entering post-secondary studies in fields related to healthcare, science, or community service, and honors Dr. Ives' contributions to education and public health.
                                </p>
                                <p className="body-text mb-4 text-black">
                                    Candidates must be actively outlining their educational goals, proof of enrollment in a post-secondary institution, and references. Applications are available through the District 16 website or local school offices.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* How to Apply Section */}
            <div className="container mx-auto px-4 py-6 content-block">
                <h2 className="heading-2 text-edge-green-dark mb-6 ">How to Apply</h2>
                
                {isMobile ? (
                    // Mobile view - Each school has its own toggle section
                    <div className="space-y-4">
                        {/* Local High School Annual Bursary */}
                        <div className="border border-edge-green-dark rounded-md overflow-hidden">
                            <button 
                                className="w-full bg-edge-green-dark text-white p-4 text-left flex justify-between items-center font-heading"
                                onClick={() => toggleBursary('apply-local')}
                            >
                                <span>Local High School Annual Bursary</span>
                                <span className={`text-2xl transition-transform duration-200 ${expandedBursary === 'apply-local' ? 'rotate-90' : ''}`}>&gt;</span>
                            </button>
                            
                            {expandedBursary === 'apply-local' && (
                                <div className="p-4 bg-white">
                                    <div className="space-y-8">
                                        {/* Step 1 */}
                                        <div className="flex items-start space-x-6">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src="/images/application-1.jpg"
                                                    alt="Obtain the Application Form"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="heading-3 text-edge-green-dark mb-2">Step 1: Obtain the Application Form</h4>
                                                <p className="body-text text-black">
                                                    Pick up a copy from the school's guidance office or download it from <Link href="#" className="underline text-edge-green-dark">Insert Website</Link>.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Step 2 */}
                                        <div className="flex items-start space-x-6">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src="/images/application-2.jpg"
                                                    alt="Prepare Required Documents"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="heading-3 text-edge-green-dark mb-2">Step 2: Prepare Required Documents</h4>
                                                <ul className="body-text text-black list-disc ml-5">
                                                    <li>Write a personal statement explaining your academic goals, community involvement, and financial need.</li>
                                                    <li>Gather transcripts and letters of recommendation.</li>
                                                </ul>
                                            </div>
                                        </div>
                                        
                                        {/* Step 3 */}
                                        <div className="flex items-start space-x-6">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src="/images/application-3.jpg"
                                                    alt="Complete the Application"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="heading-3 text-edge-green-dark mb-2">Step 3: Complete the Application</h4>
                                                <p className="body-text text-black">
                                                    Fill out all required fields on the application form accurately.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Step 4 */}
                                        <div className="flex items-start space-x-6">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src="/images/application-4.jpg"
                                                    alt="Submit Before the Deadline"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="heading-3 text-edge-green-dark mb-2">Step 4: Submit Before the Deadline</h4>
                                                <p className="body-text text-black">
                                                    Ensure all documents are compiled and submit your application by [Insert Date] to the guidance office or the designated submission platform.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* District 16's Dr. Ives Bursary */}
                        <div className="border border-edge-green-dark rounded-md overflow-hidden">
                            <button 
                                className="w-full bg-edge-green-dark text-white p-4 text-left flex justify-between items-center font-heading"
                                onClick={() => toggleBursary('apply-ives')}
                            >
                                <span>District 16's Dr. Ives Bursary</span>
                                <span className={`text-2xl transition-transform duration-200 ${expandedBursary === 'apply-ives' ? 'rotate-90' : ''}`}>&gt;</span>
                            </button>
                            
                            {expandedBursary === 'apply-ives' && (
                                <div className="p-4 bg-white">
                                    <div className="space-y-8">
                                        {/* Step 1 */}
                                        <div className="flex items-start space-x-6">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src="/images/application-1.jpg"
                                                    alt="Obtain the Application Form"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="heading-3 text-edge-green-dark mb-2">Step 1: Obtain the Application Form</h4>
                                                <p className="body-text text-black">
                                                    Pick up a copy from the District 16 office or download it from <Link href="#" className="underline text-edge-green-dark">District 16 Website</Link>.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Step 2 */}
                                        <div className="flex items-start space-x-6">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src="/images/application-2.jpg"
                                                    alt="Prepare Required Documents"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="heading-3 text-edge-green-dark mb-2">Step 2: Prepare Required Documents</h4>
                                                <ul className="body-text text-black list-disc ml-5">
                                                    <li>Write a personal statement explaining your academic goals, community involvement, and financial need.</li>
                                                    <li>Gather transcripts and letters of recommendation.</li>
                                                </ul>
                                            </div>
                                        </div>
                                        
                                        {/* Step 3 */}
                                        <div className="flex items-start space-x-6">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src="/images/application-3.jpg"
                                                    alt="Complete the Application"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="heading-3 text-edge-green-dark mb-2">Step 3: Complete the Application</h4>
                                                <p className="body-text text-black">
                                                    Fill out all required fields on the application form accurately.
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Step 4 */}
                                        <div className="flex items-start space-x-6">
                                            <div className="flex-shrink-0">
                                                <Image
                                                    src="/images/application-4.jpg"
                                                    alt="Submit Before the Deadline"
                                                    width={80}
                                                    height={80}
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="heading-3 text-edge-green-dark mb-2">Step 4: Submit Before the Deadline</h4>
                                                <p className="body-text text-black">
                                                    Ensure all documents are compiled and submit your application by [Insert Date] to the District 16 office or the designated submission platform.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Desktop view - Side by side boxes with clickable headers
                    <div>
                        {/* School selection headers */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <button 
                                className={`${selectedSchool === 'local' ? 'bg-edge-green-dark text-white' : 'bg-edge-green-secondary text-edge-green-dark'} p-4 text-center font-heading text-h3 rounded-t-lg border-2 border-edge-green-dark`}
                                onClick={() => setSelectedSchool('local')}
                            >
                                Local High School Annual Bursary
                            </button>
                            
                            <button 
                                className={`${selectedSchool === 'ives' ? 'bg-edge-green-dark text-white' : 'bg-edge-green-secondary text-edge-green-dark'} p-4 text-center font-heading text-h3 rounded-t-lg border-2 border-edge-green-dark`}
                                onClick={() => setSelectedSchool('ives')}
                            >
                                District 16's Dr. Ives Bursary
                            </button>
                        </div>
                        
                        {/* Application Steps - Only show the selected school */}
                        <div className="border border-edge-green-dark rounded-lg p-6 bg-white">
                            {selectedSchool === 'local' ? (
                                // Local High School Annual Bursary Steps
                                <div className="space-y-8">
                                    {/* Step 1 */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src="/images/application-1.jpg"
                                                alt="Obtain the Application Form"
                                                width={80}
                                                height={80}
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="heading-3 text-edge-green-dark mb-2">Step 1: Obtain the Application Form</h4>
                                            <p className="body-text text-black">
                                                Pick up a copy from the school's guidance office or download it from <Link href="#" className="underline">Insert Website</Link>.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Step 2 */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src="/images/application-2.jpg"
                                                alt="Prepare Required Documents"
                                                width={80}
                                                height={80}
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="heading-3 text-edge-green-dark mb-2">Step 2: Prepare Required Documents</h4>
                                            <ul className="body-text text-black list-disc ml-5">
                                                <li>Write a personal statement explaining your academic goals, community involvement, and financial need.</li>
                                                <li>Gather transcripts and letters of recommendation.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    {/* Step 3 */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src="/images/application-3.jpg"
                                                alt="Complete the Application"
                                                width={80}
                                                height={80}
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="heading-3 text-edge-green-dark mb-2">Step 3: Complete the Application</h4>
                                            <p className="body-text text-black">
                                                Fill out all required fields on the application form accurately.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Step 4 */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src="/images/application-4.jpg"
                                                alt="Submit Before the Deadline"
                                                width={80}
                                                height={80}
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="heading-3 text-edge-green-dark mb-2">Step 4: Submit Before the Deadline</h4>
                                            <p className="body-text text-black">
                                                Ensure all documents are compiled and submit your application by [Insert Date] to the guidance office or the designated submission platform.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // District 16's Dr. Ives Bursary Steps
                                <div className="space-y-8">
                                    {/* Step 1 */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src="/images/application-1.jpg"
                                                alt="Obtain the Application Form"
                                                width={80}
                                                height={80}
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="heading-3 text-edge-green-dark mb-2">Step 1: Obtain the Application Form</h4>
                                            <p className="body-text text-black">
                                                Pick up a copy from the District 16 office or download it from <Link href="#" className="underline">District 16 Website</Link>.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Step 2 */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src="/images/application-2.jpg"
                                                alt="Prepare Required Documents"
                                                width={80}
                                                height={80}
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="heading-3 text-edge-green-dark mb-2">Step 2: Prepare Required Documents</h4>
                                            <ul className="body-text text-black list-disc ml-5">
                                                <li>Write a personal statement explaining your academic goals, community involvement, and financial need.</li>
                                                <li>Gather transcripts and letters of recommendation.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    {/* Step 3 */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src="/images/application-3.jpg"
                                                alt="Complete the Application"
                                                width={80}
                                                height={80}
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="heading-3 text-edge-green-dark mb-2">Step 3: Complete the Application</h4>
                                            <p className="body-text text-black">
                                                Fill out all required fields on the application form accurately.
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Step 4 */}
                                    <div className="flex items-start space-x-6">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src="/images/application-4.jpg"
                                                alt="Submit Before the Deadline"
                                                width={80}
                                                height={80}
                                                className="rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="heading-3 text-edge-green-dark mb-2">Step 4: Submit Before the Deadline</h4>
                                            <p className="body-text text-black">
                                                Ensure all documents are compiled and submit your application by [Insert Date] to the District 16 office or the designated submission platform.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Important Dates Section */}
            {/* Important Dates Section */}
            <div className="container mx-auto px-4 py-6 content-block">
                    <h2 className="heading-2 text-edge-green-dark mb-6">Important Dates</h2>
                    
                    <div className="space-y-3">
                        {/* April 1 */}
                        <div className="grid grid-cols-[96px_1fr] bg-edge-green-secondary rounded-md overflow-hidden">
                            <div className="bg-edge-green-primary flex flex-col items-center justify-center py-4">
                                <div className="text-xs uppercase tracking-wider text-edge-green-dark">April</div>
                                <div className="text-3xl font-bold text-edge-green-dark">1</div>
                            </div>
                            <div className="p-4 flex items-center">
                                <p className="text-black">Applications open for both bursaries.</p>
                            </div>
                        </div>
                        
                        {/* April 10 */}
                        <div className="grid grid-cols-[96px_1fr] bg-edge-green-secondary rounded-md overflow-hidden">
                            <div className="bg-edge-green-primary flex flex-col items-center justify-center py-4">
                                <div className="text-xs uppercase tracking-wider text-edge-green-dark">April</div>
                                <div className="text-3xl font-bold text-edge-green-dark">10</div>
                            </div>
                            <div className="p-4 flex items-center">
                                <p className="text-black">Information session at [High School Name] for students interested in applying.</p>
                            </div>
                        </div>
                        
                        {/* May 3 */}
                        <div className="grid grid-cols-[96px_1fr] bg-edge-green-secondary rounded-md overflow-hidden">
                            <div className="bg-edge-green-primary flex flex-col items-center justify-center py-4">
                                <div className="text-xs uppercase tracking-wider text-edge-green-dark">May</div>
                                <div className="text-3xl font-bold text-edge-green-dark">3</div>
                            </div>
                            <div className="p-4 flex items-center">
                                <p className="text-black">Deadline to request recommendation letters from teachers or mentors.</p>
                            </div>
                        </div>
                        
                        {/* May 15 */}
                        <div className="grid grid-cols-[96px_1fr] bg-edge-green-secondary rounded-md overflow-hidden">
                            <div className="bg-edge-green-primary flex flex-col items-center justify-center py-4">
                                <div className="text-xs uppercase tracking-wider text-edge-green-dark">May</div>
                                <div className="text-3xl font-bold text-edge-green-dark">15</div>
                            </div>
                            <div className="p-4 flex items-center">
                                <p className="text-black">Final application submission deadline for the Local High School Annual Bursary.</p>
                            </div>
                        </div>
                        
                        {/* June 6 */}
                        <div className="grid grid-cols-[96px_1fr] bg-edge-green-secondary rounded-md overflow-hidden">
                            <div className="bg-edge-green-primary flex flex-col items-center justify-center py-4">
                                <div className="text-xs uppercase tracking-wider text-edge-green-dark">June</div>
                                <div className="text-3xl font-bold text-edge-green-dark">6</div>
                            </div>
                            <div className="p-4 flex items-center">
                                <p className="text-black">Final application submission deadline for the Dr. Ives Bursary.</p>
                            </div>
                        </div>
                        
                        {/* June 12 */}
                        <div className="grid grid-cols-[96px_1fr] bg-edge-green-secondary rounded-md overflow-hidden">
                            <div className="bg-edge-green-primary flex flex-col items-center justify-center py-4">
                                <div className="text-xs uppercase tracking-wider text-edge-green-dark">June</div>
                                <div className="text-3xl font-bold text-edge-green-dark">12</div>
                            </div>
                            <div className="p-4 flex items-center">
                                <p className="text-black">Review and selection process by the bursary committees.</p>
                            </div>
                        </div>
                        
                        {/* June 20 */}
                        <div className="grid grid-cols-[96px_1fr] bg-edge-green-secondary rounded-md overflow-hidden">
                            <div className="bg-edge-green-primary flex flex-col items-center justify-center py-4">
                                <div className="text-xs uppercase tracking-wider text-edge-green-dark">June</div>
                                <div className="text-3xl font-bold text-edge-green-dark">20</div>
                            </div>
                            <div className="p-4 flex items-center">
                                <p className="text-black">Award recipients announced at the high school graduation ceremony or via official email notification.</p>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}