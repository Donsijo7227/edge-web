'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

export default function ResponsiveNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close dropdown when toggling menu
    if (!isMenuOpen) {
      setIsDropdownOpen(false);
    }
  };

  // Toggle dropdown in mobile menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="absolute top-0 left-0 w-full text-white px-5 py-4 bg-transparent z-20">
      <div className="flex justify-between items-center w-full">
        {/* Logo (only shown on desktop) */}
        <div className="hidden md:block text-xl font-bold pl-4">
          <Link href="/">
            <span className="cursor-pointer"><img src='/EDGE Logo.png' className='w-20'></img></span>
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden z-30">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
              <span className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex flex-grow justify-center items-center space-x-10">
          <li>
            <Link href="/" className="hover:underline">
              HOME
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              ABOUT US
            </Link>
          </li>
          <li>
            <Link href="/membership" className="hover:underline">
              MEMBERSHIP
            </Link>
          </li>
          <li>
            <Link href="/events" className="hover:underline">
              EVENTS
            </Link>
          </li>

          {/* Dropdown Menu for Resources (Desktop) */}
          <li className="relative">
            <button
              className="hover:underline focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              RESOURCES ▾
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-40 bg-white text-black shadow-md rounded">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/resources/news">News</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/resources/projects">Projects</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/gallery">Gallery</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link href="/resources/other-clubs">Other Clubs</Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/bursary" className="hover:underline">
              BURSARY
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              CONTACT US
            </Link>
          </li>
        </ul>

        {/* Profile Icon (Right-aligned) */}
        <div className="pr-4">
          <Link href="/profile">
            <FaUserCircle className="text-2xl cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#123800] flex flex-col items-center justify-start pt-24 px-6 z-20">
          <ul className="flex flex-col items-center space-y-6 text-xl w-full">
            <li className="text-center w-full">
              <Link 
                href="/"
                className="block py-2 hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME
              </Link>
            </li>
            <li className="text-center w-full">
              <Link 
                href="/about" 
                className="block py-2 hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT US
              </Link>
            </li>
            <li className="text-center w-full">
              <Link 
                href="/membership" 
                className="block py-2 hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                MEMBERSHIP
              </Link>
            </li>
            <li className="text-center w-full">
              <Link 
                href="/events" 
                className="block py-2 hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                EVENTS
              </Link>
            </li>

            {/* Resources dropdown in mobile menu */}
            <li className="text-center w-full">
              <button
                className="flex items-center justify-center w-full py-2 hover:text-gray-300"
                onClick={toggleDropdown}
              >
                RESOURCES
                <span className="ml-2">{isDropdownOpen ? '▴' : '▾'}</span>
              </button>
              {isDropdownOpen && (
                <ul className="mt-2 space-y-2 w-full">
                  <li className="text-center">
                    <Link 
                      href="/resources/news" 
                      className="block py-2 hover:text-gray-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      News
                    </Link>
                  </li>
                  <li className="text-center">
                    <Link 
                      href="/resources/projects" 
                      className="block py-2 hover:text-gray-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Projects
                    </Link>
                  </li>
                  <li className="text-center">
                    <Link 
                      href="/gallery" 
                      className="block py-2 hover:text-gray-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Gallery
                    </Link>
                  </li>
                  <li className="text-center">
                    <Link 
                      href="/resources/other-clubs" 
                      className="block py-2 hover:text-gray-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Other Clubs
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="text-center w-full">
              <Link 
                href="/bursary" 
                className="block py-2 hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                BURSARY
              </Link>
            </li>
            <li className="text-center w-full">
              <Link 
                href="/contact" 
                className="block py-2 hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT US
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}