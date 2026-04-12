"use client"

import { useEffect, useState } from "react"

const POSTER =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"

/**
 * Full-bleed hero background: `public/Video/Hero.mp4` (optional `Hero.webm`).
 * Path must match folder casing — Vercel (Linux) is case-sensitive (`/Video/` not `/video/`).
 * Falls back to poster image when `prefers-reduced-motion: reduce`.
 */
export function HeroVideoBackground() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  if (reduceMotion) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${POSTER}')` }}
        aria-hidden
      />
    )
  }

  return (
    <video
      className="absolute inset-0 h-full min-h-full w-full min-w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      aria-hidden
    >
      <source src="/Video/Hero.mp4" type="video/mp4" />
      <source src="/Video/Hero.webm" type="video/webm" />
    </video>
  )
}
