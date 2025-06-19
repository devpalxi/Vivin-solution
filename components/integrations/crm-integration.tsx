"use client";
import { useEffect } from "react";

export function CRMIntegration() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !document.getElementById("hs-script-loader")
    ) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.id = "hs-script-loader";
      script.async = true;
      script.defer = true;
      script.src = "//js-na2.hs-scripts.com/243090139.js"; // Use your actual portal ID
      document.body.appendChild(script);

      return () => {
        if (document.getElementById("hs-script-loader")) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  return null;
}
