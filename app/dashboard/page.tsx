'use client'

import AppSidebar from "@/components/app-sidebar"
import Card from "@/components/dashboard/Card"
import DasboardNavbar from "@/components/dashboard/DasboardNavbar";
import DemographicChart from "@/components/dashboard/DemographicChart";
import LocationCard from "@/components/dashboard/LocationCard";
import TrafficChart from "@/components/dashboard/TrafficChart";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { FiUsers, FiCalendar } from "react-icons/fi";

export default function Page() {
  return (
    <div className="h-screen overflow-hidden">
      <SidebarProvider >
        <div className="ml-2">
          <AppSidebar />
        </div>
        <SidebarTrigger className="-ml-1" />
        <div className="p-4 flex-grow flex flex-col h-full">
          <DasboardNavbar />
          <div className="flex-grow flex flex-col gap-4 overflow-y-auto h-[calc(100vh-85px)]">
            <div className="flex justify-between gap-4 flex-wrap">
              <Card title="Admin" desc="5" Icon={FiUsers} />
              <Card title="Member" desc="55" Icon={FiUsers} />
              <Card title="Upcoming Events" desc="12" Icon={FiCalendar} />
            </div>
            <TrafficChart />
            <div className="flex justify-between gap-4 flex-wrap flex-col sm:flex-row">
              <div className="flex-1">
                <LocationCard />
              </div>
              <div className="flex-1">
                <DemographicChart />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}
