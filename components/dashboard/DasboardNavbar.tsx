import Image from 'next/image'
import React from 'react'

type Props = {}

function DasboardNavbar({ }: Props) {
    return (
        <div className="bg-edge-green-accent w-full relative -top-4 flex justify-between py-2 px-4">
            <Image src={"/images/edgelogo.png"} alt='logo' height={50} width={50} />
            <div className='flex gap-4 items-center'>
                <div>
                    <h4 className='text-base text-white'>Rosianna Wilson</h4>
                    <p className="text-sm text-end text-white">Admin</p>
                </div>
                <div className="rounded-full relative h-[50px] w-[50px]">
                    <Image src={"/images/userImage.png"} alt='logo'
                        layout="fill"
                        objectFit="cover" />
                </div>
            </div>
        </div>
    )
}

export default DasboardNavbar