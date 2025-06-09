"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    fbq: any
  }
}

export function FacebookPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize Facebook Pixel
    if (typeof window !== "undefined") {
      // @ts-ignore
      !((f, b, e, v, n, t, s) => {
        if (f.fbq) return
        n = f.fbq = () => {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        }
        if (!f._fbq) f._fbq = n
        n.push = n
        n.loaded = !0
        n.version = "2.0"
        n.queue = []
        t = b.createElement(e)
        t.async = !0
        t.src = v
        s = b.getElementsByTagName(e)[0]
        s.parentNode.insertBefore(t, s)
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js")
      // @ts-ignore
      window.fbq("init", "YOUR_PIXEL_ID") // Replace with your actual Pixel ID
    }
  }, [])

  useEffect(() => {
    // Track page views
    if (typeof window !== "undefined") {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
      // @ts-ignore
      window.fbq("track", "PageView")
      console.log(`Facebook Pixel PageView: ${url}`)
    }
  }, [pathname, searchParams])

  return null
}
