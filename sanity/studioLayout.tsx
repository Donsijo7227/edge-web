// ./sanity/studioLayout.tsx
'use client'

import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { MdDashboardCustomize } from 'react-icons/md'
import type { LayoutProps } from 'sanity'

export function StudioLayout(props: LayoutProps) {
  return (
    <div className="relative">
      {/* Custom Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 py-3">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img src="/images/edgelogo.png" alt="Edge Logo" className="h-8" />
          <span className="text-lg font-semibold text-gray-800">Content Management</span>
        </div>

        {/* Right: Quick Access Buttons */}
        <div className="flex flex-wrap gap-3 justify-end min-w-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-green-700 transition"
            style={{ backgroundColor: '#16a34a' }} 
          >
            <FiExternalLink size={16} />
            Live Site
          </a>
          <a
            href="/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-blue-700 transition"
            style={{ backgroundColor: '#2563eb' }} 
          >
            <MdDashboardCustomize size={16} />
            Dashboard
          </a>
        </div>
      </div>

      {/* Render the rest of the studio */}
      {props.renderDefault(props)}
    </div>
  )
}
