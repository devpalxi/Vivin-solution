"use client"

import { useEffect } from "react"

export function CRMIntegration() {
  useEffect(() => {
    // This is where you would initialize your CRM integration
    // For example, HubSpot tracking code
    if (typeof window !== "undefined") {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.id = "hs-script-loader"
      script.async = true
      script.defer = true
      script.src = "//js.hs-scripts.com/YOUR_PORTAL_ID.js" // Replace with your actual HubSpot Portal ID
      document.body.appendChild(script)

      return () => {
        if (document.getElementById("hs-script-loader")) {
          document.body.removeChild(script)
        }
      }
    }
  }, [])

  return null
}
