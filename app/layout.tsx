import type { Metadata } from "next";
import "./globals.css";
import { TTSProvider } from "@/components/providers/TTSProvider";
import { AccessibilityProvider } from "@/components/providers/AccessibilityProvider";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import CustomToaster from "@/components/ui/CustomToaster";
import { SeasonalBackground } from "nextjs-seasonal-plugin";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://masscareagency.co.uk")
  ),
  title: "Mass Care - Professional Nursing, Home Care & Training Services",
  description:
    "Mass Care provides exceptional nursing care, home care services, and professional training. Celebrating 8 years of meaningful care with CQC recognition and national coverage.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mass Care",
    title: "Mass Care - Professional Nursing, Home Care & Training Services",
    description:
      "Mass Care provides exceptional nursing care, home care services, and professional training. Celebrating 8 years of meaningful care with CQC recognition and national coverage.",
    images: [
      {
        url: "/logo-mass-care.png",
        width: 1200,
        height: 630,
        alt: "Mass Care Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mass Care - Professional Nursing, Home Care & Training Services",
    description:
      "Mass Care provides exceptional nursing care, home care services, and professional training. Celebrating 8 years of meaningful care with CQC recognition and national coverage.",
    images: ["/logo-mass-care.png"],
  },
  icons: {
    icon: "/logo-mass-care.png",
    apple: "/logo-mass-care.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="dns-prefetch"
          href="https://mass-care.s3.eu-west-2.amazonaws.com"
        />
        <link
          rel="dns-prefetch"
          href="https://www.mass-care-agency.dev5.intersmarthosting.in"
        />
        <link
          rel="preconnect"
          href="https://mass-care.s3.eu-west-2.amazonaws.com"
        />
        <link
          rel="preconnect"
          href="https://www.mass-care-agency.dev5.intersmarthosting.in"
        />
        <link
          rel="preload"
          href="/hero-banner.png"
          as="image"
          fetchPriority="high"
        />
        <link rel="preload" as="style" href="/globals.css" />
      </head>
      <body
        className="antialiased overflow-x-hidden"
        style={{ fontFamily: "Helvetica" }}
      >
        <AccessibilityProvider>
          <TTSProvider>
            <Header />
            <CustomToaster />
            <div className="bg-white text-black">
              <SeasonalBackground zIndex={2} />
              {children}
            </div>
            <Footer />
          </TTSProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
