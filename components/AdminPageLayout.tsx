// components/AdminPageLayout.tsx
'use client';

import { ReactNode } from 'react';
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not admin
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-[#a8d080] border-t-[#123800] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="h-screen flex">
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
      <div className="flex-shrink-0">
        <SidebarProvider>
          <div className="ml-2">
            <AppSidebar />
          </div>
          <SidebarTrigger className="-ml-1" />
        </SidebarProvider>
      </div>
      <div className="flex-grow p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
}