"use client";

import { useState } from "react"; // Import useState for managing dropdown visibility
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

export default function Page() {
  // State to handle the visibility of the dropdowns
  const [isPreliminaryPageOpen, setIsPreliminaryPageOpen] = useState(false);
  const [isOverviewPageOpen, setIsOverviewPageOpen] = useState(false);
  const [isGalleryPageOpen, setIsGalleryPageOpen] = useState(false);
  const [isEventPageOpen, setIsEventPageOpen] = useState(false);
  const [isProjectPageOpen, setIsProjectPageOpen] = useState(false);
  const [isRecognitionPageOpen, setIsRecognitionPageOpen] = useState(false);
  const [isBursaryPageOpen, setIsBursaryPageOpen] = useState(false);

  // Toggle function for Preliminary dropdown
  const togglePreliminaryPage = () => {
    setIsPreliminaryPageOpen(!isPreliminaryPageOpen);
  };

  // Toggle function for Overview dropdown
  const toggleOverviewPage = () => {
    setIsOverviewPageOpen(!isOverviewPageOpen);
  };

  // Toggle function for the Gallery page dropdown
  const toggleGalleryPage = () => {
    setIsGalleryPageOpen(!isGalleryPageOpen);
  };

  // Toggle function for the Event page dropdown
  const toggleEventPage = () => {
    setIsEventPageOpen(!isEventPageOpen);
  };

  // Toggle function for the Project page dropdown
  const toggleProjectPage = () => {
    setIsProjectPageOpen(!isProjectPageOpen);
  };

  // Toggle function for the Recognition page dropdown
  const toggleRecognitionPage = () => {
    setIsRecognitionPageOpen(!isRecognitionPageOpen);
  };

  // Toggle function for the Bursary page dropdown
  const toggleBursaryPage = () => {
    setIsBursaryPageOpen(!isBursaryPageOpen);
  };

  return (
    <div className="h-screen flex">
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
            Start here
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
              If you are not able to see the admin panel, please contact your
              website team for more information at CodeBrew@.....
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
              <div className="flex justify-align-left">
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
        {/* Dropdown Gallery Page */}
        <div className="mb-4">
          <h2
            className="heading-2 text-edge-green-dark mb-4 mt-10 cursor-pointer flex items-center"
            onClick={toggleGalleryPage} // Use the toggleEventPage function to handle the click
          >
            How to update Gallery page
            <span className="ml-2">
              {isGalleryPageOpen ? (
                <FiChevronDown className="ml-2" size={30} />
              ) : (
                <FiChevronRight className="ml-2" size={30} />
              )}
            </span>
          </h2>
          {isGalleryPageOpen && (
            <div>
              <p className="body-text text-black mb-4">
                There are 2 parts when creating a new gallery page: Gallery
                Category and Gallery Photo.
                <br />
                The gallery category MUST be created before adding new photos.
                <br />
                1. To create a new Galley Category, navigate to CMS from the
                left-hand sidebar and choose "Gallery Category".
                <br />
                Click (+) sign to add a new category, add in the information,
                thumbnail photo, and publish when ready.
                <br />
                <em>
                  {" "}
                  Note: to automatically create the slug, click "Generate" in
                  the Slug field.
                </em>
              </p>
              <div className="flex justify-align-left">
                <img
                  src="/documentation/gallery-demo.png"
                  alt="dashboard-demo"
                  className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                />
              </div>
              <div className="body-text text-black mb-4 pt-desktop-block">
                <p>
                  2. After creating the Gallery Category, navigate to "Gallery
                  Photo" from the left-hand sidebar.
                  <br />
                  Click (+) sign to add a new Gallery photo, add in the
                  information, you will find all of the categories available in
                  the dropdown menu below the title. Choose one category.
                  <br />
                  Add images and publish when ready.
                </p>

                <div className="flex justify-align-left">
                  <img
                    src="/documentation/gallery-demo-1.png"
                    alt="dashboard-demo"
                    className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* End of dropdown Gallery Page */}
        {/* --------------------------------------------------------------------------------------------------------- */}

        {/* --------------------------------------------------------------------------------------------------------- */}
        {/* Dropdown Event*/}
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
            <div>
              <p className="body-text text-black mb-4">
                In order to edit the Event page, you need to navigate to CMS
                from the left-hand sidebar.
              </p>
              <div className="flex justify-align-left">
                <img
                  src="/documentation/studio-demo.png"
                  alt="dashboard-demo"
                  className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                />
              </div>
              <div className="body-text text-black mb-4 pt-desktop-block">
                <p>
                  {" "}
                  Navigate to the Event folder on the left-hand side in the
                  studio.
                  <br />
                  To add new event, click (+) sign to add and publish when
                  ready.
                </p>
              </div>
              <div className="flex justify-align-left">
                <img
                  src="/documentation/event-demo.png"
                  alt="dashboard-demo"
                  className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                />
              </div>
              <div className="body-text text-black mb-4 pt-desktop-block">
                <p>
                  To edit a current event, click the event that needs updating,
                  make changes on the page and publish when ready.
                </p>
              </div>
              <div className="flex justify-align-left">
                <img
                  src="/documentation/event-demo-1.png"
                  alt="dashboard-demo"
                  className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                />
              </div>
            </div>
          )}
        </div>
        {/* end of dropdown Event*/}
        {/* --------------------------------------------------------------------------------------------------------- */}

        {/* --------------------------------------------------------------------------------------------------------- */}
        {/* Dropdown Project */}
        <div className="mb-4">
          <h2
            className="heading-2 text-edge-green-dark mb-4 mt-10 cursor-pointer flex items-center"
            onClick={toggleProjectPage}
          >
            How to update Project page
            <span className="ml-2">
              {isProjectPageOpen ? (
                <FiChevronDown className="ml-2" size={30} />
              ) : (
                <FiChevronRight className="ml-2" size={30} />
              )}
            </span>
          </h2>
          {isProjectPageOpen && (
            <div>
              <p className="body-text text-black mb-4">
                In order to edit the Project page, navigate to CMS from the
                left-hand sidebar. Then, click "Project" from the studio.
              </p>
              <div className="flex justify-align-left">
                <img
                  src="/documentation/project-demo.png"
                  alt="dashboard-demo"
                  className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                />
              </div>
            </div>
          )}
        </div>
        {/* end of dropdown Project */}
        {/* --------------------------------------------------------------------------------------------------------- */}

        {/* --------------------------------------------------------------------------------------------------------- */}
        {/* Dropdown Recognition */}
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
            <div>
              <p className="body-text text-black mb-4">
                Navigate to the CMS from the left-hand sidebar. Then, click
                "Recognition" from the studio.
                <br />
                To create add a new individual, click (+) sign.
                <br />
                Enter the information and upload a photo. Then "Publish" when
                ready.
                <br />
                <em className="text-red-600">
                  {" "}
                  After uploading photo, use the crop tool on the top right of
                  the picture to resize or crop{" "}
                </em>
              </p>
              <div className="flex justify-align-left">
                <img
                  src="/documentation/recognition-demo.png"
                  alt="dashboard-demo"
                  className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                />
              </div>
            </div>
          )}
        </div>
        {/* end of dropdown Recognition*/}
        {/* --------------------------------------------------------------------------------------------------------- */}

        {/* --------------------------------------------------------------------------------------------------------- */}
        {/* Dropdown of Bursary */}
        <div className="pt-4 mb-4">
          <h2
            className="heading-2 text-edge-green-dark mb-4 cursor-pointer flex items-center"
            onClick={toggleBursaryPage}
          >
            How to update Bursary page
            <span className="ml-2">
              {isBursaryPageOpen ? (
                <FiChevronDown className="ml-2" size={30} />
              ) : (
                <FiChevronRight className="ml-2" size={30} />
              )}
            </span>
          </h2>
          {isBursaryPageOpen && (
            <div>
              <p className="body-text text-black mb-4">
                Bursary page includes 3 main parts: Bursaries, How to Apply, and
                Important dates.
                <br />
                These 3 parts can be all edited in Content Management.
                <br />
                To edit the Bursary page, navigate to CMS from the left-hand
                sidebar.
              </p>
              {/* PART 1 */}
              <h3 className="heading-3 text-edge-green-dark mb-4">
                Part 1: Edit information in "Bursaries"
              </h3>
              <p className="body-text text-black mb-4">Text</p>
              <div className="flex justify-align-left mb-4">
                <img
                  src="/documentation/bursary-demo.png"
                  alt="dashboard-demo"
                  className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                />
              </div>
              {/* END OF PART 1 */}

              {/* ------------------ */}

              {/* PART 2 */}
              <h3 className="heading-3 text-edge-green-dark mb-4">
                Part 2: Edit information in "How to Apply"
              </h3>
              <p className="body-text text-black mb-4">Text</p>
              <div className="flex justify-align-left mb-4">
                <img
                  src="/documentation/bursary-demo-1.png"
                  alt="dashboard-demo"
                  className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                />
              </div>
              {/* END OF PART 2 */}

              {/* ------------------ */}

              {/* PART 3 */}
              <h3 className="heading-3 text-edge-green-dark mb-4">
                Part 3: Edit information in "Important Dates"
              </h3>
              <p className="body-text text-black mb-4">Text</p>
              <div className="flex justify-align-left">
                <img
                  src="/documentation/bursary-demo-2.png"
                  alt="dashboard-demo"
                  className="max-w-[700px] rounded-[10px] border border-edge-green-dark"
                />
              </div>
              {/* END OF PART 3 */}
              {/* ------------------ */}
            </div>
          )}
        </div>

        {/* end of dropdown Bursary */}
        {/* --------------------------------------------------------------------------------------------------------- */}
      </div>
    </div>
  );
}













