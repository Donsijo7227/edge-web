'use client';

import { useState, useEffect } from 'react';
import { groq } from 'next-sanity';
import Image from "next/image";
import NavBar from "@/components/navBar";
import Hero from "@/components/hero";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import { client } from '@/sanity/lib/client';

// TypeScript interface for member resources
interface MembershipForm {
  _id: string;
  title: string;
  resourceFile: {
    asset: {
      _ref: string;
      url: string;
    };
  };
}

export default function Membership() {
    const [membershipForm, setMembershipForm] = useState<MembershipForm | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchMembershipForm = async () => {
            try {
                const query = groq`
                    *[_type == "memberResource" && category == "membershipForm"][0] {
                        _id,
                        title,
                        resourceFile {
                            asset-> {
                                _ref,
                                url
                            }
                        }
                    }
                `;
                
                const data = await client.fetch(query);
                setMembershipForm(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch membership form:", err);
                setLoading(false);
            }
        };

        fetchMembershipForm();
    }, []);
    
    const downloadMembershipForm = () => {
        if (membershipForm?.resourceFile?.asset?.url) {
            window.open(membershipForm.resourceFile.asset.url, '_blank');
        }
    };

    return (
      <>
        {/* Hero Component */}
        <Hero
          title="Membership Information"
          backgroundImage="/images/membership-hero-banner.jpg"
        />

        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 pt-4 content-block">
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
        <div className="container mx-auto px-4  content-block">
          <div className="max-w-12xl">
            {/* <p className="body-desktop body-mobile mb-4">
                        Be part of a passionate network of gardeners, nature lovers, and environmental advocates dedicated to making our world greener. As a member, you'll have the chance to expand your horticultural knowledge, get involved in hands-on gardening projects, and support initiatives that enhance our local landscapes.
                    </p> */}
            <p className="body-desktop body-mobile">
              Membership gives you access to exclusive workshops, expert-led
              talks, and special events centered around sustainable gardening,
              conservation, and community beautification. Whether you're looking
              to refine your gardening skills, connect with like-minded
              individuals, or contribute to environmental stewardship, our club
              provides the perfect space to learn and grow. By joining us,
              you'll do more than just cultivate plants—you'll help cultivate a
              greener, more beautiful future for everyone. Sign up today and
              become a part of something truly rewarding!
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto px-4 content-block">
          <h1 className="h1-desktop h1-mobile font-heading text-[#123800] mb-6">
            Benefits
          </h1>

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
                    <h3 className="h2-desktop h2-mobile font-heading text-[#123800]">
                      Learn & Grow
                    </h3>
                  </div>
                  <p className=" body-desktop body-mobile">
                    Gain expert knowledge through workshops, lectures, and
                    hands-on experiences.
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
                    <h3 className="h2-desktop h2-mobile font-heading text-[#123800]">
                      Build Connections
                    </h3>
                  </div>
                  <p className="body-desktop body-mobile">
                    Join a supportive community of plant lovers, exchange ideas,
                    and make lasting friendships.
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
                    <h3 className="h2-desktop h2-mobile font-heading text-[#123800]">
                      Boost Well-Being
                    </h3>
                  </div>
                  <p className="body-desktop body-mobile">
                    Gardening promotes relaxation, reduces stress, and connects
                    you with nature.
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
                    <h3 className="h2-desktop h2-mobile font-heading text-[#123800]">
                      Inspiration
                    </h3>
                  </div>
                  <p className="body-desktop body-mobile">
                    Be a role model by educating youth and the community on the
                    importance of plants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Apply Section */}
        <div className="container mx-auto px-4 content-block">
          <h1 className="h1-desktop h1-mobile font-heading text-[#123800] mb-6">
            How to Apply
          </h1>

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
                <h2 className="h2-desktop h2-mobile font-heading text-[#123800] mb-2">
                  Step 1: Download application form
                </h2>
                <p className="body-desktop body-mobile mb-4">
                  Download the application form below and fill in your
                  information.
                </p>
                <button
                  className="bg-[#123800] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors mx-auto block sm:mx-0 "
                  onClick={downloadMembershipForm}
                  disabled={loading || !membershipForm}
                >
                  {loading ? "Loading..." : "Download"}
                </button>
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
                <h2 className="h2-desktop h2-mobile font-heading text-[#123800] mb-2">
                  Step 2: Pay membership fee
                </h2>
                <p className="body-desktop body-mobile mb-4">
                  Bring the complete application, along with our annual fee $15
                  to E.D.G.E at 123 Street Name, Elmvale, ON A1B CD2.
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
                <h2 className="h2-desktop h2-mobile font-heading text-[#123800] mb-2">
                  Step 3: Wait for your login information
                </h2>
                <p className="body-desktop body-mobile mb-4">
                  Our admin will review your application and send out your login
                  information via your email provided on the application form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );


}