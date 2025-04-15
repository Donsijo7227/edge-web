'use client'
import NextBreadcrumb from '@/components/NextBreadcrumb'
import Hero from '@/components/hero'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function About() {
  return (
    <>
      {/* Hero Component */}
      <Hero
        title='About Us'
        backgroundImage="/images/about-us-hero-banner.jpg"
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

      {/* Land Acknowledgement section */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="h1-desktop h1-mobile font-heading text-[#123800] mb-6">Land Acknowledgement</h1>

        <p className="body-desktop body-mobile mb-4">
          E.D.G.E respectfully acknowledges that we gather, learn, and cultivate on the traditional territories of Indigenous peoples who have stewarded this land for generations. As a community dedicated to horticulture and conservation, we commit to learning from Indigenous practices, respecting the land, and promoting sustainability in all that we do. We strive to foster a deeper understanding of our shared responsibility to care for the environment and support reconciliation efforts through education and action.
        </p>
      </div>

      {/* History section */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="h1-desktop h1-mobile font-heading text-[#123800] mb-6">History</h1>
        <WhiteCard desc='The Elmvale and District Horticultural Society was started in 1979 in the village of Elmvale and surrounding municipalities of Flos, Medonte now within the Township of Springwater.' year={'1979'} />
        <GreenCard desc='Since 1979, E.D.G.E has created and supported horticultural, garden-related, floral artistry, environmental and educational projects.' year={'1979 - 2018'} />
        <WhiteCard year='2018' desc='We recognized the change in roles of the horticultural society to be a garden and environmental educator of the public.' />
        <GreenCard year="2019" desc="The Elmvale and District Horticultural Society changed its name in 2019 to Elmvale District Garden Enthusiast's or E.D.G.E."/>
        <WhiteCard year='2025' desc='E.D.G.E masks an achievement of 50 members.' />
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="h1-desktop h1-mobile font-heading text-[#123800] mb-6">Mission Statement</h1>
        <div className='flex flex-col gap-4 md:flex-row items-center md:gap-8'>
          <div className="w-full md:w-1/2">
            <Image
              src="/images/mission-statement-image.jpg"
              alt="Plant in pot"
              width={500}
              height={500}
              className="rounded-3xl mx-auto w-full h-auto object-contain"
            />
          </div>
          <p className="body-desktop body-mobile mb-4 md:w-1/2">
            We are a non-profit organization that educates and promotes all branches of horticulture. Encourage planting trees, shrubs and flowers in our communities. Promote protection of the environment through practice, lectures and public education. 
          </p>
        </div>
      </div>
    </>
  )
}

type CardProps = {
  year: string;
  desc: string;
}

const GreenCard = ({ desc, year }: CardProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Set initial state
    setIsMobile(window.innerWidth < 450);
    
    // Update state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="text-lg mb-4 border-2 border-[#123800] md:flex md:gap-4 p-4 rounded-xl">
      <div className='flex items-center gap-4'>
        <Image
          src="/images/little-tree-gree.png"
          alt="Plant in pot"
          width={isMobile ? 60 : 100}
          height={isMobile ? 100 : 160}
          className="rounded-lg mx-auto sm:mx-0 md:m-auto"
        />
        <h1 className='md:hidden block flex-1 text-[#123800]'>{year}</h1>
      </div>
      <div className='text-[#123800] flex flex-col gap-4 mt-4 md:mt-0 md:flex-1'>
        <h1 className='hidden md:block'>{year}</h1>
        <p className='leading-7'>
          {desc}
        </p>
      </div>
    </div>
  )
}

const WhiteCard = ({ desc, year }: CardProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Set initial state
    setIsMobile(window.innerWidth < 450);
    
    // Update state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="text-lg mb-4 bg-[#123800] md:flex md:gap-4 p-4 rounded-xl">
      <div className='flex items-center gap-4'>
        <Image
          src="/images/little-tree-white.png"
          alt="Plant in pot"
          width={isMobile ? 60 : 100}
          height={isMobile ? 100 : 160}
          className="rounded-lg mx-auto sm:mx-0 md:m-auto"
        />
        <h1 className='md:hidden block flex-1 text-white'>{year}</h1>
      </div>
      <div className='text-white flex flex-col gap-4 mt-4 md:mt-0 md:flex-1'>
        <h1 className='hidden md:block'>{year}</h1>
        <p className='leading-7'>
          {desc}
        </p>
      </div>
    </div>
  )
}