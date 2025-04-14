// components/GoogleAnalytics.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, logPageView } from '@/lib/analytics';

export default function GoogleAnalytics(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize GA only once
    initGA();
  }, []);

  useEffect(() => {
    // Track page views when pathname or search params change
    if (pathname) {
      logPageView();
    }
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}