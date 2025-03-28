
/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */


// app/studio/[[...tool]]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
        })
        
        if (res.ok) {
          const data = await res.json()
          if (data.user && data.user.role === 'admin') {
            setIsAdmin(true)
          } else {
            // Not an admin, redirect
            router.push(data.user ? '/account' : '/')
          }
        } else {
          // Not authenticated
          router.push('/')
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/')
      }
    }
    
    checkAuth()
  }, [router])
  
  // Show loading state
  if (isAdmin === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#a8d080] border-t-[#123800] rounded-full mx-auto mb-4 animate-spin"></div>
          <p className="text-[#123800] font-semibold">Loading Sanity Studio...</p>
        </div>
      </div>
    )
  }
  
  // Render studio when authenticated
  return <NextStudio config={config} />
}