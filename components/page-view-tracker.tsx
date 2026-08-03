"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Records one page view per path per browser session (avoids refresh spam). */
export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || pathname === "/count" || pathname.startsWith("/api/")) return
    const key = `deva_hit:${pathname}`
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, "1")
    } catch {
      /* private mode — still try to record */
    }
    void fetch("/api/hit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {})
  }, [pathname])

  return null
}
