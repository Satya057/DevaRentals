"use client"

import { useEffect, useRef, useState } from "react"

const POSTER =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"

/** Bumps cache for `/video/Hero.mp4` after deploys (old 404 / stale responses on some PCs). */
const HERO_MP4_BUST =
  process.env.NEXT_PUBLIC_HERO_VIDEO_V?.trim() || "2"

/**
 * Set to `1` in Vercel → Environment Variables if office PCs use “Reduce motion” but you still want the hero video.
 * (Otherwise we respect `prefers-reduced-motion: reduce` and show the poster only.)
 */
const FORCE_HERO_VIDEO = process.env.NEXT_PUBLIC_HERO_FORCE_VIDEO === "1"

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
 * - Remote Desktop (RDP) often skips GPU video decode → `<video>` may show only the
 *   **poster** (same house image as before). Test on the physical PC with a local browser.
 * - `prefers-reduced-motion: reduce` → poster only.
 */
export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    if (FORCE_HERO_VIDEO) {
      setReduceMotion(false)
      return
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [FORCE_HERO_VIDEO])

  useEffect(() => {
    if ((reduceMotion && !FORCE_HERO_VIDEO) || videoFailed) return
    const v = videoRef.current
    if (!v) return

    v.muted = true
    v.defaultMuted = true
    v.setAttribute("muted", "")
    v.setAttribute("playsinline", "")

    const kick = () => {
      void v.play().catch(() => {})
    }

    kick()
    v.addEventListener("canplay", kick, { once: true })
    v.addEventListener("loadeddata", kick, { once: true })

    /* RDP / weak GPU: short play retries (poster matches old design, so “no video” is easy to mistake). */
    let n = 0
    const t = window.setInterval(() => {
      if (v.paused && v.readyState >= 2) kick()
      n += 1
      if (n >= 8) window.clearInterval(t)
    }, 500)

    return () => {
      window.clearInterval(t)
      v.removeEventListener("canplay", kick)
      v.removeEventListener("loadeddata", kick)
    }
  }, [reduceMotion, videoFailed, FORCE_HERO_VIDEO])

  if ((reduceMotion && !FORCE_HERO_VIDEO) || videoFailed) {
    return <StaticHeroBg />
  }

  const mp4Src = `/video/Hero.mp4?v=${encodeURIComponent(HERO_MP4_BUST)}`

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full min-h-full w-full min-w-full object-cover [transform:translateZ(0)]"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      aria-hidden
      onError={() => setVideoFailed(true)}
    >
      <source src={mp4Src} type="video/mp4" />
    </video>
  )
}
