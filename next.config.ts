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
        source: "/home",
        destination: "/",
        permanent: true, // 301 Redirect
      },
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
      {
        source: "/product/:path*", // Matches any URL under /product/
        destination: "/", // Redirects to homepage
        permanent: true, // 301 redirect (SEO-friendly)
      },
      {
        source: "/eights-weed-delivery-nyc-free-delivery-24-7/",
        destination: "/eighths",
        permanent: true,
      },
      {
        source: "/pre-rolls-weed-delivery-nyc-free-delivery-24-7/",
        destination: "/pre-rolls",
        permanent: true,
      },
      {
        source: "/product/bubblegum-gelato-buy-2-or-more-pay-30-each/",
        destination: "/eighths/bubblegum-gelato",
        permanent: true,
      },
      {
        source: "/product-category/vape/page/1/",
        destination: "/vapes",
        permanent: true,
      },
      {
        source: "/product-category/edibles/page/1/",
        destination: "/edibles",
        permanent: true,
      },
      {
        source: "/product-category/pre-rolls/page/1/",
        destination: "/pre-rolls",
        permanent: true,
      },
      {
        source: "/shop-2/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog-2/",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
