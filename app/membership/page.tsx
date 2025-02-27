'use client';

import Image from "next/image";
import NavBar from "@/components/navBar";
import Hero from "@/components/hero";
import NextBreadcrumb from "@/components/NextBreadcrumb";


export default function Membership() {
    return (
        <>
            <NavBar />
            {/* Hero Component */}
            <Hero 
                title="Membership Information" 
                backgroundImage="/images/membership-hero-banner.jpg" 
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

            {/* Introduction paragraphs */}
            <div className="container mx-auto px-4 py-6">
                <div className="max-w-12xl">
                    <p className="text-lg mb-4">
                        Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto. Et velit esse vel perferendis recusandae quo architecto odit aut quos minima. Non voluptas aperiam et dolorem voluptas ut repudiandae sint et provident enim ut beatae porro ut quod soluta.
                    </p>
                    <p className="text-lg">
                        Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto. Et velit esse vel perferendis recusandae quo architecto odit aut quos minima. Non voluptas aperiam et dolorem voluptas ut repudiandae sint et provident enim ut beatae porro ut quod soluta.
                    </p>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-3xl font-heading text-[#123800] mb-6">Benefits</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Image section */}
                    <div className="col-span-1">
                        <Image
                            src="/images/benefit-image.png"
                            alt="Plants on shelves"
                            width={500}
                            height={500}
                            className="rounded-lg w-full h-auto"
                        />
                    </div>
                    
                    {/* Benefits list */}
                    <div className="col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Benefit Item 1 */}
                            <div className="benefit-item">
                                <div className="flex items-center mb-2">
                                    <Image
                                        src="/images/leaf.png"
                                        alt="Leaf icon"
                                        width={40}
                                        height={40}
                                        className="mr-3"
                                    />
                                    <h3 className="text-xl font-heading text-[#123800]">Lorem Ipsum</h3>
                                </div>
                                <p className="text-base">
                                    Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto.
                                </p>
                            </div>
                            
                            {/* Benefit Item 2 */}
                            <div className="benefit-item">
                                <div className="flex items-center mb-2">
                                    <Image
                                        src="/images/leaf.png"
                                        alt="Leaf icon"
                                        width={40}
                                        height={40}
                                        className="mr-3"
                                    />
                                    <h3 className="text-xl font-heading text-[#123800]">Lorem Ipsum</h3>
                                </div>
                                <p className="text-base">
                                    Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto.
                                </p>
                            </div>
                            
                            {/* Benefit Item 3 */}
                            <div className="benefit-item">
                                <div className="flex items-center mb-2">
                                    <Image
                                        src="/images/leaf.png"
                                        alt="Leaf icon"
                                        width={40}
                                        height={40}
                                        className="mr-3"
                                    />
                                    <h3 className="text-xl font-heading text-[#123800]">Lorem Ipsum</h3>
                                </div>
                                <p className="text-base">
                                    Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto.
                                </p>
                            </div>
                            
                            {/* Benefit Item 4 */}
                            <div className="benefit-item">
                                <div className="flex items-center mb-2">
                                    <Image
                                        src="/images/leaf.png"
                                        alt="Leaf icon"
                                        width={40}
                                        height={40}
                                        className="mr-3"
                                    />
                                    <h3 className="text-xl font-heading text-[#123800]">Lorem Ipsum</h3>
                                </div>
                                <p className="text-base">
                                    Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How to Apply Section */}
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-3xl font-heading text-[#123800] mb-6">How to Apply</h2>
                
                <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0 w-full sm:w-auto">
                            <Image
                                src="/images/application-1.jpg"
                                alt="Plant in pot"
                                width={160}
                                height={160}
                                className="rounded-lg mx-auto sm:mx-0"
                            />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-heading text-[#123800] mb-2">Step 1: Download application form</h3>
                            <p className="text-base mb-4">
                                Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
                            </p>
                        </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0 w-full sm:w-auto">
                            <Image
                                src="/images/application-2.jpg"
                                alt="Plant in pot"
                                width={160}
                                height={160}
                                className="rounded-lg mx-auto sm:mx-0"
                            />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-heading text-[#123800] mb-2">Step 2: Pay membership fee</h3>
                            <p className="text-base mb-4">
                                Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
                            </p>
                        </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0 w-full sm:w-auto">
                            <Image
                                src="/images/application-3.jpg"
                                alt="Plant in pot"
                                width={160}
                                height={160}
                                className="rounded-lg mx-auto sm:mx-0"
                            />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-heading text-[#123800] mb-2">Step 3: Wait for your login information</h3>
                            <p className="text-base mb-4">
                                Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
