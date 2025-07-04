"use client";
import Script from "next/script";

export function GoogleAnalytics() {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-E57778W68N`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E57778W68N', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
