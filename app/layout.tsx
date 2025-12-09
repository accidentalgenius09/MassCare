import type { Metadata } from "next";
import "./globals.css";
import { TTSProvider } from '@/components/providers/TTSProvider';
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Mass Care - Professional Nursing, Home Care & Training Services",
  description: "Mass Care provides exceptional nursing care, home care services, and professional training. Celebrating 8 years of meaningful care with CQC recognition and national coverage.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Mass Care',
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
        <link rel="dns-prefetch" href="https://mass-care.s3.eu-west-2.amazonaws.com" />
        <link rel="dns-prefetch" href="https://www.mass-care-agency.dev5.intersmarthosting.in" />
        <link rel="preload" href="/hero-banner.png" as="image" fetchPriority="high" />
      </head>
      <body className="antialiased overflow-x-hidden" style={{ fontFamily: 'Helvetica' }}>
        <AccessibilityProvider>
          <TTSProvider>
            <Header />
            <Toaster position="top-right" />
            <div className="bg-white text-black">
              {children}
            </div>
            <Footer />
          </TTSProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
