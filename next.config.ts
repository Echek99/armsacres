import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow all subdomains
      }
    ]
  },
  output: 'standalone', // Optimize for serverless
};

export default nextConfig;
