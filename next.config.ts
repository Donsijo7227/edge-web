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
  // Add this ESLint configuration to ignore errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;