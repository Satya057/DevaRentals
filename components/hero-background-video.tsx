"use client"

import { useEffect, useRef, useState, type RefObject } from "react"

const POSTER =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"

function heroVideoSrc(): string {
  return process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() || "/Video/Hero.mp4"
}

function useHeroVisibilityPlay(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onVisibility = () => {
      if (document.visibilityState === "hidden") v.pause()
      else void v.play().catch(() => {})
    }

    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [videoRef])
}

/** Full-area cover; parent clips overflow. Subtle zoom via `.hero-bg-video-drift`. */
export function HeroBackgroundVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const src = heroVideoSrc()

  useHeroVisibilityPlay(ref)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.defaultMuted = true
    v.muted = true
    v.loop = true
    v.playbackRate = 1
    void v.play().catch(() => {})
    return () => {
      v.loop = false
    }
  }, [src])

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
      className="hero-bg-video-drift pointer-events-none absolute inset-0 h-full w-full object-cover [backface-visibility:hidden]"
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      poster={POSTER}
      aria-hidden
      loop
      onError={() => setFailed(true)}
    />
  )
}
