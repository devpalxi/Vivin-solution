import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { Analytics } from "@/components/analytics";
import { CRMIntegration } from "@/components/integrations/crm-integration";
import { Suspense } from "react";
import FooterServer from "@/components/navigation/footer-server";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Vivin Digital | Premium Marketing Agency",
    template: "%s | Vivin Digital",
  },
  description:
    "Vivin Digital is a premium marketing agency helping businesses grow through strategic digital solutions.",
  openGraph: {
    title: "Vivin Digital | Premium Marketing Agency",
    description:
      "Vivin Digital is a premium marketing agency helping businesses grow through strategic digital solutions.",
    url: "https://vivinsolutions.com",
    siteName: "Vivin Digital",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vivin Digital",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivin Digital | Premium Marketing Agency",
    description:
      "Vivin Digital is a premium marketing agency helping businesses grow through strategic digital solutions.",
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
        <CRMIntegration />
        {children}
        <CookieConsent />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
