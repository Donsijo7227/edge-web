import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: false, // Changed to false to prevent double-mounting
  images: {
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },
  // Allow Sanity files to be loaded
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
    ];
  },
  // Ignore all types of errors during build
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint checks
  },
  typescript: {
    ignoreBuildErrors: true, // Skip TypeScript type checking
  },
  // Remove this line:
  // swcMinify: true, // Use SWC minifier which is more forgiving
  output: 'standalone', // More stable output format
  poweredByHeader: false, // Remove X-Powered-By header
  productionBrowserSourceMaps: false, // Disable source maps in production
};
export default nextConfig;