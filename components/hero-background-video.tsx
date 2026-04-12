"use client"

import { useEffect, useRef, useState } from "react"

const POSTER =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"

function heroVideoSources(): string[] {
  const fromEnv = process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim()
  if (fromEnv) return [fromEnv]
  return ["/video/hero-video.mp4", "/video/hero.mp4", encodeURI("/video/Hero Video.mp4")]
}

export function HeroBackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.defaultMuted = true
    v.muted = true
    const p = v.play()
    if (p !== undefined) p.catch(() => {})
  }, [])

  if (failed) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${POSTER}')` }}
      />
    )
  }

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full min-h-full w-full min-w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      aria-hidden
      onError={() => setFailed(true)}
    >
      {heroVideoSources().map((src) => (
        <source key={src} src={src} type="video/mp4" />
      ))}
    </video>
  )
}
