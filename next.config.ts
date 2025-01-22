import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all subdomains, more reliable than '*'
      },
    ],
  },
  output: "standalone", // Ensure compatibility with Netlify
};

export default nextConfig;
