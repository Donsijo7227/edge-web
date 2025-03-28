'use client'

import AppSidebar from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <div className="h-screen overflow-hidden">
       <style jsx global>{`
          header, nav, footer {
            display: none !important;
          }
          
         
          .navbar, .site-footer {
            display: none !important;
          }
          
         
          .studio-container {
            width: 100%;
            height: 100%;
          }
        `}</style>
      <div className="pt-">
        <SidebarProvider >
          <div className="ml-2">
            <AppSidebar />
          </div>
          <SidebarTrigger className="-ml-1" />
        </SidebarProvider>
      </div>
    </div>
  )
}
