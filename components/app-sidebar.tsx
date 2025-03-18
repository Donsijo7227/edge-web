import React from 'react';
import { FiHome, FiFile, FiClipboard } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { BiCube } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { TbSettings } from "react-icons/tb";
import Link from 'next/link';

type NavOption = {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const DashboardOptions: NavOption[] = [
  {
    title: 'Live site',
    icon: <FiHome size={20} />,
    link: '#'
  },
  {
    title: 'Users',
    icon: <LuUsers size={20} />,
    link: '#'
  },
  {
    title: 'Bursary',
    icon: <FiFile size={20} />,
    link: '#'
  },
  {
    title: 'Forms',
    icon: <FiClipboard size={20} />,
    link: '#'
  },
  {
    title: 'Content Management System',
    icon: <BiCube size={20} />,
    link: '#'
  },
  {
    title: 'Documentations',
    icon: <CgFileDocument size={20} />,
    link: '#'
  },
]

const PreferencesOptions: NavOption[] = [
  {
    title: 'Profile',
    icon: <FaRegUser size={20} />,
    link: '#'
  },
  {
    title: 'Setting',
    icon: <TbSettings size={20} />,
    link: '#'
  },
]

function AppSidebar() {
  return (
    <div className='bg-edge-green-secondary h-full py-4 px-2 flex flex-col gap-10'>
      <div>
        <p className='text-edge-text heading font-bold text-xl'>Dashboard</p>
        <div className='gap-4 flex flex-col mt-4'>
          {DashboardOptions.map(item => (
            <Link href={item.link} className='flex gap-4 items-center cursor-pointer'>
              {item.icon}
              <div className='body text-base'>
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <p className='text-edge-text heading font-bold text-xl'>Preferences</p>
        <div className='gap-4 flex flex-col mt-4'>
          {PreferencesOptions.map(item => (
            <Link href={item.link} className='flex gap-4 items-center cursor-pointer'>
              {item.icon}
              <div className='body text-base'>
                {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AppSidebar