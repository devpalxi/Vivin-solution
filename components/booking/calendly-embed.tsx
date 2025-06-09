"use client"

import type React from "react"

import { useEffect } from "react"

interface CalendlyEmbedProps {
  url: string
  styles?: React.CSSProperties
}

export default function CalendlyEmbed({ url, styles = {} }: CalendlyEmbedProps) {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Clean up
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: "320px", height: "630px", ...styles }}
    ></div>
  )
}
