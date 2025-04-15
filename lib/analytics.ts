// lib/analytics.ts
import ReactGA from 'react-ga4';

export const initGA = (): void => {
  // Initialize with Measurement ID from environment variable
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID || 'G-XYNENJELEK';
  ReactGA.initialize(measurementId);
};

// For page views
export const logPageView = (): void => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};

// For custom events
export const logEvent = (category: string, action: string, label?: string): void => {
  ReactGA.event({
    category,
    action,
    label
  });
};