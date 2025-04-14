'use client'

import React from 'react'; 
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initGA, logPageView } from '@/lib/analytics'
import { Suspense } from 'react'

// Separated logic that uses useSearchParams
function GAHandler() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    initGA()
  }, [])

  useEffect(() => {
    if (pathname) {
      logPageView()
    }
  }, [pathname, searchParams])

  return null
}

export default function GoogleAnalytics(): React.ReactElement  {
  return (
    <Suspense fallback={null}>
      <GAHandler />
    </Suspense>
  )
}
