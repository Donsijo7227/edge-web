'use client'
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';
import LoginOverlay from './LoginOverlay';
import Image from 'next/image';

export default function ResponsiveNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const dropdownRef = useRef(null); // Reference for dropdown menu for outside clicks

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

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
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
  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle login overlay
  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  // Close login overlay
  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  // Close dropdown when a dropdown link is clicked
  const handleDropdownLinkClick = () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className='global-nav'>
        <nav
          style={{ fontFamily: 'Bakbak' }}
          className="absolute top-0 left-0 w-full text-white px-5 py-4 bg-transparent z-20 "
        >
          <div className="flex justify-between items-center w-full">
            {/* Logo (only shown on desktop) */}
            <div className="hidden md:block text-xl font-bold pl-4">
              <Link href="/">
                <span className="cursor-pointer">
                  <Image src="/images/edgelogo.png" width={80} height={80} alt="Logo" />
                </span>
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
                  <span
                    className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''
                      }`}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''
                      }`}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
                      }`}
                  ></span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex flex-grow justify-center items-center space-x-10">
              <li>
                <Link href="/" className="hover:text-[#a8d080] transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#a8d080] transition-colors">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-[#a8d080] transition-colors">
                  MEMBERSHIP
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#a8d080] transition-colors">
                  EVENTS
                </Link>
              </li>

              {/* Dropdown Menu for Resources (Desktop) */}
              <li className="relative" ref={dropdownRef}>
                <button
                  className="hover:text-[#a8d080] transition-colors focus:outline-none"
                  onClick={toggleDropdown}
                >
                  RESOURCES ▾
                </button>
                {isDropdownOpen && (
                  <ul className="absolute left-0 mt-2 w-40 bg-white text-black shadow-md rounded">
                    <li className="px-4 py-2 hover:bg-[#a8d080]">
                      <Link href="/recognition" onClick={handleDropdownLinkClick}>Recognition</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-[#a8d080]">
                      <Link href="/projects" onClick={handleDropdownLinkClick}>Projects</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-[#a8d080]">
                      <Link href="/gallery" onClick={handleDropdownLinkClick}>Gallery</Link>
                    </li>
                    <li className="px-4 py-1 hover:bg-[#a8d080]">
                      <Link href="/garden-clubs" onClick={handleDropdownLinkClick}>Garden Clubs</Link>
                    </li>
                    <li className="px-4 py-1 hover:bg-[#a8d080]">
                      <Link href="/memberhub" onClick={handleDropdownLinkClick}>Member Hub</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <Link href="/bursary" className="hover:text-[#a8d080] transition-colors">
                  BURSARY
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#a8d080] transition-colors">
                  CONTACT US
                </Link>
              </li>
            </ul>

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

          {/* Mobile Menu Sidebar */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-[#123800] flex flex-col items-center justify-start pt-24 px-6 z-20">
              <ul className="flex flex-col items-center space-y-6 text-xl w-full">
                <li className="text-center w-full">
                  <Link
                    href="/"
                    className="block py-2 hover:text-[#a8d080] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    HOME
                  </Link>
                </li>
                <li className="text-center w-full">
                  <Link
                    href="/about"
                    className="block py-2 hover:text-[#a8d080] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ABOUT US
                  </Link>
                </li>
                <li className="text-center w-full">
                  <Link
                    href="/membership"
                    className="block py-2 hover:text-[#a8d080] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    MEMBERSHIP
                  </Link>
                </li>
                <li className="text-center w-full">
                  <Link
                    href="/events"
                    className="block py-2 hover:text-[#a8d080] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    EVENTS
                  </Link>
                </li>

                {/* Resources dropdown in mobile menu */}
                <li className="text-center w-full">
                  <button
                    className="flex items-center justify-center w-full py-2 hover:text-[#a8d080] transition-colors"
                    onClick={toggleDropdown}
                  >
                    RESOURCES
                    <span className="ml-2">{isDropdownOpen ? '▴' : '▾'}</span>
                  </button>
                  {isDropdownOpen && (
                    <ul className="mt-2 space-y-2 w-full">
                      <li className="text-center">
                        <Link
                          href="/recognition"
                          className="block py-2 hover:text-[#a8d080] transition-colors"
                          onClick={handleDropdownLinkClick}
                        >
                          Recognition
                        </Link>
                      </li>
                      <li className="text-center">
                        <Link
                          href="/projects"
                          className="block py-2 hover:text-[#a8d080] transition-colors"
                          onClick={handleDropdownLinkClick}
                        >
                          Projects
                        </Link>
                      </li>
                      <li className="text-center">
                        <Link
                          href="/gallery"
                          className="block py-2 hover:text-[#a8d080] transition-colors"
                          onClick={handleDropdownLinkClick}
                        >
                          Gallery
                        </Link>
                      </li>
                      <li className="text-center">
                        <Link
                          href="/garden-clubs"
                          className="block py-2 hover:text-[#a8d080] transition-colors"
                          onClick={handleDropdownLinkClick}
                        >
                          Garden Clubs
                        </Link>
                      </li>
                      <li className="text-center">
                        <Link
                          href="/memberhub"
                          className="block py-2 hover:text-[#a8d080] transition-colors"
                          onClick={handleDropdownLinkClick}
                        >
                          Member Hub
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="text-center w-full">
                  <Link
                    href="/bursary"
                    className="block py-2 hover:text-[#a8d080] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    BURSARY
                  </Link>
                </li>
                <li className="text-center w-full">
                  <Link
                    href="/contact"
                    className="block py-2 hover:text-[#a8d080] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    CONTACT US
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>

        {/* Login Overlay */}
        <LoginOverlay isOpen={isLoginOpen} onClose={closeLogin} />
      </div>
    </>
  );
}