import Image from "next/image";
import React from "react";

type Props = {};

function LocationCard({}: Props) {
  return (
    <div className="bg-edge-green-secondary w-full h-full px-4 py-2 rounded-xl border-border border-2">
      <h3 className="text-edge-text text-xl mb-2">Member Location</h3>
      <div className="relative w-full h-[12rem]">
        <Image 
          src="/images/map.png" 
          alt="Map" 
          layout="fill" 
          objectFit="cover" 
          className="rounded-md"
        />
      </div>
    </div>
  );
}

export default LocationCard;
