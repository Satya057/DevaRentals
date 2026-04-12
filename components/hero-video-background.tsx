"use client"

import { useEffect, useRef, useState } from "react"

const POSTER =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"

/** Static hero background if video cannot load or autoplay. */
function StaticHeroBg() {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${POSTER}')` }}
      aria-hidden
    />
  )
}

/**
 * Full-bleed hero: `public/video/Hero.mp4` (optional `Hero.webm`).
 * - Uses lowercase `video/` so URLs match Linux/Vercel (case-sensitive).
 * - If the file 404s, codec fails, or autoplay is blocked → poster image.
 * - `prefers-reduced-motion: reduce` → poster only (accessibility).
 */
export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (reduceMotion || videoFailed) return
    const v = videoRef.current
    if (!v) return

    const tryPlay = () => {
      void v.play().catch(() => {
        /* Autoplay blocked or not ready — poster stays visible until video plays */
      })
    }

    tryPlay()
    v.addEventListener("canplay", tryPlay, { once: true })
    return () => v.removeEventListener("canplay", tryPlay)
  }, [reduceMotion, videoFailed])

  if (reduceMotion || videoFailed) {
    return <StaticHeroBg />
  }

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full min-h-full w-full min-w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      aria-hidden
      onError={() => setVideoFailed(true)}
    >
      <source src="/video/Hero.mp4" type="video/mp4" />
      <source src="/video/Hero.webm" type="video/webm" />
    </video>
  )
}
