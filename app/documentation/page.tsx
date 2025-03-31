"use client";

import { useState } from "react"; // Import useState for managing dropdown visibility
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

export default function Page() {
  // State to handle the visibility of the dropdowns
  const [isPreliminaryPageOpen, setIsPreliminaryPageOpen] = useState(false);
  const [isOverviewPageOpen, setIsOverviewPageOpen] = useState(false);
  const [isEventPageOpen, setIsEventPageOpen] = useState(false);
  const [isRecognitionPageOpen, setIsRecognitionPageOpen] = useState(false);

  // Toggle function for Preliminary dropdown
  const togglePreliminaryPage = () => {
    setIsPreliminaryPageOpen(!isPreliminaryPageOpen);
  };

  // Toggle function for Overview dropdown
  const toggleOverviewPage = () => {
    setIsOverviewPageOpen(!isOverviewPageOpen);
  };

  // Toggle function for the Event page dropdown
  const toggleEventPage = () => {
    setIsEventPageOpen(!isEventPageOpen);
  };

  // Toggle function for the Recognition page dropdown
  const toggleRecognitionPage = () => {
    setIsRecognitionPageOpen(!isRecognitionPageOpen);
  };

  return (
    <div className="h-screen flex">
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

        {/* Dropdown Preliminary*/}
        <div className="mb-4">
          <h2
            className="heading-2 text-red-600 mb-4 mt-10 cursor-pointer flex items-center"
            onClick={togglePreliminaryPage} // Use the toggleEventPage function to handle the click
          >
            Preliminary - Start here
            <span className="ml-2">
              {isPreliminaryPageOpen ? (
                <FiChevronDown className="ml-2" size={30} />
              ) : (
                <FiChevronRight className="ml-2" size={30} />
              )}
            </span>
          </h2>
          {isPreliminaryPageOpen && (
            <p className="body-text text-red-600 mb-4">
              All admin users need to make sure you are using logging in with
              your admin account to be able to see the admin panel.
              <br />
              If you are not able to see the admin panel, please contact your IT
              team for more details at [Point of Contact].
            </p>
          )}
        </div>
        {/* end of dropdown Preliminary*/}

        {/* --------------------------------------------------------------------------------------------------------- */}
        {/* Dropdown Overview*/}
        <div className="mb-4">
          <h2
            className="heading-2 text-edge-green-dark mb-4 mt-10 cursor-pointer flex items-center"
            onClick={toggleOverviewPage} // Use the toggleEventPage function to handle the click
          >
            Overview
            <span className="ml-2">
              {isOverviewPageOpen ? (
                <FiChevronDown className="ml-2" size={30} />
              ) : (
                <FiChevronRight className="ml-2" size={30} />
              )}
            </span>
          </h2>
          {isOverviewPageOpen && (
            <div>
              <p className=" body-text text-black mb-4">
                Below is the overview of the admin panel and the different
                sections:
              </p>
              <div className="flex justify-center">
                <img
                  src="/documentation/dashboard-demo.png"
                  alt="dashboard-demo"
                  className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                />
              </div>

              <div className="pl-[30px] pt-desktop-block overflow-auto">
                <ul className="list-disc">
                  <li>
                    {" "}
                    <strong>Live site:</strong> Quick access to the public
                    website directly from the dashboard
                  </li>
                  <li>
                    {" "}
                    <strong>Users: </strong> Overview of all users and related
                    information
                  </li>
                  <li>
                    {" "}
                    <strong>Bursary:</strong> Form submission for Local High
                    School Bursary
                  </li>
                  <li>
                    {" "}
                    <strong>Content Management System or CMS: </strong> Access
                    to the studio where admin can create, edit, remove content
                    on Gallery, Recognition, Events, Projects, Resources, and
                    Bursary.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        {/* end of dropdown Overview*/}
        {/* --------------------------------------------------------------------------------------------------------- */}

        {/* --------------------------------------------------------------------------------------------------------- */}
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
        {/* --------------------------------------------------------------------------------------------------------- */}

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

