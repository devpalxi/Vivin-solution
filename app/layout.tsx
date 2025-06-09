import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { Analytics } from "@/components/analytics";
import { CRMIntegration } from "@/components/integrations/crm-integration";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Vivin Solutions | Premium Marketing Agency",
    template: "%s | Vivin Solutions",
  },
  description:
    "Vivin Solutions is a premium marketing agency helping businesses grow through strategic digital solutions.",
  openGraph: {
    title: "Vivin Solutions | Premium Marketing Agency",
    description:
      "Vivin Solutions is a premium marketing agency helping businesses grow through strategic digital solutions.",
    url: "https://vivinsolutions.com",
    siteName: "Vivin Solutions",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vivin Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivin Solutions | Premium Marketing Agency",
    description:
      "Vivin Solutions is a premium marketing agency helping businesses grow through strategic digital solutions.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Suspense>{children}</Suspense>
          </main>
          <Footer />
        </div>
        <CookieConsent />
        <Analytics />
        <CRMIntegration />
      </body>
    </html>
  );
}
