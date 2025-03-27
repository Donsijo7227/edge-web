import React from 'react'
import { IconType } from 'react-icons/lib';

type Props = {
    title: string;
    Icon: IconType;
    desc: string;
    twClassName?: string;
}

function Card({ desc, Icon, title, twClassName }: Props) {
    return (
        <div className={`bg-edge-green-secondary flex-1 px-4 py-2 rounded-xl ${twClassName} border-border border-2`}>
            <h3 className='text-edge-text text-xl'>{title}</h3>
            <div className='flex items-end justify-end gap-4 mt-4'>
                <Icon className='text-edge-text mb-2' />
                <h1 className='text-edge-text text-6xl'>{desc}</h1>
            </div>
        </div>
    )
}

export default Card