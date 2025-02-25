'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-edge-green-dark text-white py-8 px-4">
      <div className="container mx-auto">
        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex justify-center mb-3">
              <Image 
                src="/images/edgelogo.png" 
                alt="EDGE Logo" 
                width={100} 
                height={100}
              />
            </div>
            <p className="text-lg font-heading font-bold">Elmvale District Garden Enthusiasts</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Link href="/" className="block font-medium mb-2 hover:text-edge-green-primary transition-colors">Home</Link>
              <Link href="/about" className="block font-medium mb-2 hover:text-edge-green-primary transition-colors">About Us</Link>
              <Link href="/membership" className="block font-medium mb-2 hover:text-edge-green-primary transition-colors">Membership</Link>
              <Link href="/events" className="block font-medium mb-2 hover:text-edge-green-primary transition-colors">Events</Link>
              <Link href="/resources" className="block font-medium mb-2 hover:text-edge-green-primary transition-colors">Resources</Link>
            </div>
            
            <div>
              <Link href="/bursary" className="block font-medium mb-2 hover:text-edge-green-primary transition-colors">Bursary</Link>
              <Link href="/contact" className="block font-medium mb-2 hover:text-edge-green-primary transition-colors">Contact Us</Link>
              <Link href="/news" className="block font-medium mb-2 hover:text-edge-green-primary transition-colors">News</Link>
              <Link href="/sitemap" className="block font-medium mb-2 hover:text-edge-green-primary transition-colors">Sitemap</Link>
              <Link href="/terms" className="block font-medium mb-2 hover:text-edge-green-primary transition-colors">Terms & Conditions</Link>
            </div>
          </div>
          
          <div>
            <div className="flex mb-3">
              <input 
                type="email" 
                placeholder="Email"
                className="px-3 py-2 border border-gray-300 rounded-l-md  w-full text-gray-800"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-[#EDF2E9] text-edge-green-dark font-heading font-bold rounded-r-md rounded-l-md border border-[#123800] hover:bg-edge-green-primary hover:text-edge-green-dark transition-colors"
              >
                Subscribe
              </button>
            </div>
            
            <p className="mb-1">E.D.G.E</p>
            <p className="mb-3">edgeelmvale@gmail.com</p>
            
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="hover:text-edge-green-primary transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                </svg>
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-edge-green-primary transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Footer */}
        <div className="flex flex-col items-center md:hidden">
          <div className="flex items-center mb-3">
            <Image 
              src="/images/edgelogo.png" 
              alt="EDGE Logo" 
              width={80} 
              height={80} 
              className="mr-3"
            />
          </div>
          <p className="text-lg font-medium text-center mb-4">Elmvale District Garden Enthusiasts</p>
          
          <div className="flex justify-center mb-4">
            <input 
              type="email" 
              placeholder="Email"
              className="px-3 py-2 border border-gray-300 rounded-l-md w-60 text-gray-800"
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-[#EDF2E9] text-edge-green-dark font-heading font-bold rounded-r-md rounded-l-md border border-[#123800] hover:bg-edge-green-primary hover:text-edge-green-dark transition-colors"
            >
              Subscribe
            </button>
          </div>
          
          <div className="flex space-x-6 mb-4">
            <Link href="#" aria-label="Facebook" className="hover:text-edge-green-primary transition-colors">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
              </svg>
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-edge-green-primary transition-colors">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="flex justify-center items-center py-2">
          <div className="flex items-center space-x-4">
            <div>
              <Image
                src="/images/little-tree-white.png"
                alt="Leaf icon"
                width={24}
                height={24}
              />
            </div>
            <div className="h-px w-20 bg-gray-400"></div>
            <p className="text-center text-sm">Copyrighted by EDGE</p>
            <div className="h-px w-20 bg-gray-400"></div>
            <div>
              <Image
                src="/images/little-tree-white.png"
                alt="Leaf icon"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;