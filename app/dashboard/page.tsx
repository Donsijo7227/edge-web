'use client'

import { useEffect, useCallback } from 'react'
import AppSidebar from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  const hideElements = useCallback(() => {
    const selectors = 'header, nav, footer, .navbar, .site-footer';
    const elements = document.querySelectorAll(selectors);
    
    elements.forEach(el => {
      if (el) {
        (el as HTMLElement).style.display = 'none';
      }
    });
  }, []);

  useEffect(() => {
    hideElements();
    
    const timeoutId = setTimeout(() => {
      const observer = new MutationObserver((mutations) => {
        const shouldHide = mutations.some(mutation => {
          return mutation.type === 'childList' && mutation.addedNodes.length > 0;
        });
        
        if (shouldHide) hideElements();
      });
      
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
      
      return () => {
        observer.disconnect();
        
        const elements = document.querySelectorAll('header, nav, footer, .navbar, .site-footer');
        elements.forEach(el => {
          if (el) {
            (el as HTMLElement).style.display = '';
          }
        });
      };
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [hideElements]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="pt-0">
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