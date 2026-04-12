"use client"

import { useEffect, useRef, useState } from "react"

const POSTER =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"

/** Cache-bust query for `hero.mp4` after deploys or file swaps. */
const HERO_MP4_BUST =
  process.env.NEXT_PUBLIC_HERO_VIDEO_V?.trim() || "3"

/** Vercel env: `1` = always autoplay video (ignore `prefers-reduced-motion`). Optional. */
const FORCE_HERO_VIDEO = process.env.NEXT_PUBLIC_HERO_FORCE_VIDEO === "1"

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
 * Background: `public/video/hero.mp4` (lowercase — OK on Vercel/Linux).
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

  const mp4Src = `/video/hero.mp4?v=${encodeURIComponent(HERO_MP4_BUST)}`

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
