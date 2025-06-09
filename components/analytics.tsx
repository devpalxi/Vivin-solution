"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { FacebookPixel } from "./analytics/facebook-pixel";

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

  return <FacebookPixel />;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}
