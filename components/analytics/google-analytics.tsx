"use client";
import Script from "next/script";

export function GoogleAnalytics() {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-34H60CS0Z4`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-34H60CS0Z4', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
