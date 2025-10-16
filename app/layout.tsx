import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TTSProvider } from '@/components/providers/TTSProvider';
import { AccessibilityProvider } from '@/components/providers/AccessibilityProvider';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AccessibilityProvider>
          <TTSProvider>
            <Header />
            {children}
            <Footer />
          </TTSProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
