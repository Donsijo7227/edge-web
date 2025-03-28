"use client";

import { useState } from "react"; // Import useState for managing dropdown visibility
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

export default function Page() {
  // State to handle the visibility of the dropdowns
  const [isEventPageOpen, setIsEventPageOpen] = useState(false);
  const [isRecognitionPageOpen, setIsRecognitionPageOpen] = useState(false);

  // Toggle function for the Event page dropdown
  const toggleEventPage = () => {
    setIsEventPageOpen(!isEventPageOpen);
  };

  // Toggle function for the Recognition page dropdown
  const toggleRecognitionPage = () => {
    setIsRecognitionPageOpen(!isRecognitionPageOpen);
  };

  return (
    <div className="h-screen overflow-hidden flex">
      {/* styling to hide the nav & footer */}
      <style jsx global>{`
        header,
        nav,
        footer {
          display: none !important;
        }

        .navbar,
        .site-footer {
          display: none !important;
        }

        .studio-container {
          width: 100%;
          height: 100%;
        }
      `}</style>
      {/* Sidebar section */}
      <div className="flex-shrink-0">
        <SidebarProvider>
          <div className="ml-2">
            <AppSidebar />
          </div>
          <SidebarTrigger className="-ml-1" />
        </SidebarProvider>
      </div>

      {/* Text content next to sidebar */}
      <div className="flex-grow p-4">
        <h1 className="heading-1 text-edge-green-dark mb-4">Documentations</h1>

        {/* Dropdown Section 1 */}
        <div className="mb-4">
          <h2
            className="heading-2 text-edge-green-dark mb-4 mt-10 cursor-pointer flex items-center"
            onClick={toggleEventPage} // Use the toggleEventPage function to handle the click
          >
            How to update Event page
            <span className="ml-2">
              {isEventPageOpen ? (
                <FiChevronDown className="ml-2" size={30} />
              ) : (
                <FiChevronRight className="ml-2" size={30} />
              )}
            </span>
          </h2>
          {isEventPageOpen && (
            <p className="body-text text-black mb-4">
              Documentation text for Event page.
            </p>
          )}
        </div>
        {/* end of dropdown section 1 */}

        {/* Dropdown Section 2 */}
        <div className="pt-4 mb-4">
          <h2
            className="heading-2 text-edge-green-dark mb-4 cursor-pointer flex items-center"
            onClick={toggleRecognitionPage} // Use the toggleRecognitionPage function to handle the click
          >
            How to update Recognition page
            <span className="ml-2">
              {isRecognitionPageOpen ? (
                <FiChevronDown className="ml-2" size={30} />
              ) : (
                <FiChevronRight className="ml-2" size={30} />
              )}
            </span>
          </h2>
          {isRecognitionPageOpen && (
            <p className="body-text text-black mb-4">
              Documentation text for Recognition page.
            </p>
          )}
        </div>
        {/* end of dropdown section 2 */}
      </div>
    </div>
  );
}





