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

  async redirects() {
    return [
      {
        source: "/armsacres-edibles-thc-infused-edibles-nyc-delivery",
        destination: "/edibles",
        permanent: true, // 301 Redirect
      },
      {
        source: "/thc-pens-weed-delivery-nyc-free-delivery-24-7",
        destination: "/vapes",
        permanent: true, // 301 Redirect
      },
      {
        source: "/pre-rolls-weed-delivery-nyc-free-delivery-24-7/",
        destination: "/pre-rolls",
        permanent: true, // 301 Redirect
      },
      {
        source: "/eights-weed-delivery-nyc-free-delivery-24-7",
        destination: "/eighths",
        permanent: true, // 301 Redirect
      },
      {
        source: "/ounces-weed-delivery-nyc-free-delivery-24-7",
        destination: "/ounces",
        permanent: true, // 301 Redirect
      },
      {
        source: "/blog-armsacres-cannabis-information",
        destination: "/blog",
        permanent: true, // 301 Redirect
      },
      // Add more redirects here if needed
    ];
  },
};

export default nextConfig;
