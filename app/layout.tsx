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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`antialiased overflow-x-hidden`} style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>
        <AccessibilityProvider>
          <TTSProvider>
            <Header />
            <Toaster />
            {children}
            <Footer />
          </TTSProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
