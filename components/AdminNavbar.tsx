import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import LoginOverlay from './LoginOverlay'

type Props = {}

function AdminNavbar({ }: Props) {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const toggleLogin = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const closeLogin = () => {
        setIsLoginOpen(false);
    };

    return (
        <>
            <nav
                style={{ fontFamily: 'Bakbak' }}
                className="w-full text-white px-5 py-2 bg-edge-green-accent"
            >
                <div className="flex justify-between items-center w-full">
                    {/* Logo (only shown on desktop) */}
                    <div className="hidden md:block text-xl font-bold">
                        <Link href="/">
                            <span className="cursor-pointer">
                                <Image src="/images/edgelogo.png" width={50} height={50} alt="Logo" />
                            </span>
                        </Link>
                    </div>


                    {/* Profile Icon (Right-aligned) - Updated to toggle login overlay */}
                    <div className="pr-4">
                        <button
                            onClick={toggleLogin}
                            className="flex items-center focus:outline-none"
                            aria-label="Open login"
                        >
                            <FaUserCircle className="hover:text-[#a8d080] transition-colors cursor-pointer" size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Login Overlay */}
            <LoginOverlay isOpen={isLoginOpen} onClose={closeLogin} />
        </>
    )
}

export default AdminNavbar