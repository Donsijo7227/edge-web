'use client'

import AppSidebar from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <div className="h-screen overflow-hidden">
      <div className="pt-4">  {/* Fixed the incomplete pt- class */}
        <SidebarProvider>
          <div className="ml-2">
            <AppSidebar />
          </div>
          <SidebarTrigger className="-ml-1" />
        </SidebarProvider>
      </div>
    </div>
  )
}