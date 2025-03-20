'use client'
import AdminNavbar from "@/components/AdminNavbar"
import AppSidebar from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <div className="h-screen overflow-hidden">
      {/* <div>
        <AdminNavbar />
      </div> */}
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
