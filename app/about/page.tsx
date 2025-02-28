'use client'
import NextBreadcrumb from '@/components/NextBreadcrumb'
import Hero from '@/components/hero'
import Image from 'next/image'
import React from 'react'

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
        <h2 className="text-3xl font-heading text-[#123800] mb-6">Land Acknowledgement</h2>

        <p className="text-lg mb-4">
          Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto. Et velit esse vel perferendis recusandae quo architecto odit aut quos minima. Non voluptas aperiam et dolorem voluptas ut repudiandae sint et provident enim ut beatae porro ut quod soluta.
        </p>
      </div>

      {/* History section */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-heading text-[#123800] mb-6">History</h2>

        <GreenCard desc='The Elmvale and District Horticultural Society was started in 1949 in the village of Elmvale and surrounding municipalities of Flos, Medonte now within the Township of Springwater.' year={'1949'} />
        <WhiteCard desc='Since 1949, EDGE has created and supported horticultural, garden-related, floral artistry, environmental and educational projects. The floral emblem of EDGE is the geranium.' year={'1949 - 2018'} />
        <GreenCard year='2018' desc='To recognize the change in roles of the horticultural society to be a garden and environmental educator of the public.' />
        <WhiteCard year='2019' desc='The Elmvale and District Horticultural Society changed its name in 2019 to "Elmvale District Garden Enthusiasts" EDGE.' />
        <GreenCard year='2025' desc='EDGE mask an achievement of 50 members...' />

      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-heading text-[#123800] mb-6">Mission Statement</h2>
        <div className='flex flex-col gap-4 md:flex-row items-center md:gap-8'>
          <Image
            src="/images/mission-statement-image.jpg"
            alt="Plant in pot"
            width={500}
            height={500}
            className="rounded-3xl mx-auto sm:mx-0 md:flex-1 h-full w-full md:m-auto"
          />
          <p className="text-lg mb-4 md:flex-1">
            Est blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusto. Et velit esse vel perferendis recusandae quo architecto odit aut quos minima. Non voluptas aperiam et dolorem voluptas ut repudiandae sint et provident enim ut beatae porro ut quod solutaEst blanditiis totam id dolorum totam est neque adipisci est totam nihil et consequatur voluptatem ut necessitatibus voluptatum id assumenda iusta Et velit esse vel perferendis recusandae uo architecto odit aut uos minima. Non voluptas aperiam et dolorem voluptas ut repudiandae sint et provident enim ut beatae porro ut quod soluta.
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
  return (
    <div className="text-lg mb-4 border-2 border-[#123800] md:flex md:gap-4 p-4 rounded-xl">
      <div className='flex items-center gap-4'>
        <Image
          src="/images/little-tree-gree.png"
          alt="Plant in pot"
          width={window.outerWidth < 450 ? 60 : 100}
          height={160}
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
  return (
    <div className="text-lg mb-4 bg-[#123800] md:flex md:gap-4 p-4 rounded-xl">
      <div className='flex items-center gap-4'>
        <Image
          src="/images/little-tree-white.png"
          alt="Plant in pot"
          width={window.outerWidth < 450 ? 60 : 100}
          height={160}
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
