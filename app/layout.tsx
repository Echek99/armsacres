import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weed Delivery NYC & NJ | Armsacres",
  description: "Get premium cannabis products delivered fast in NYC & NJ. Browse our selection of vapes, edibles, pre-rolls, and more!",
  openGraph: {
    title: "Weed Delivery NYC & NJ | Armsacres",
    description: "Fast & discreet cannabis delivery in NYC & NJ. Shop high-quality weed products now!",
    url: "https://armsacres.io",
    siteName: "Armsacres",
    images: [
      {
        url: "https://armsacres.io/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Weed Delivery NYC & NJ",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
