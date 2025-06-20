"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { FacebookPixel } from "./analytics/facebook-pixel";

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function GoogleAnalyticsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-34H60CS0Z4", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}

function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views
    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    if (typeof window !== "undefined") {
      console.log(`Page view: ${url}`);
      // Example: window.gtag('config', 'GA-MEASUREMENT-ID', { page_path: url })
    }
  }, [pathname, searchParams]);

  return (
    <>
      <FacebookPixel />
      <GoogleAnalyticsPageView />
    </>
  );
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}
