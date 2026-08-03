"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import type { EmblaCarouselType } from "embla-carousel"
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  GOOGLE_PROFILE_URL,
  GOOGLE_REVIEW_URL,
  GOOGLE_REVIEWS,
} from "@/lib/google-reviews"

const testimonials = GOOGLE_REVIEWS

const AUTO_SLIDE_MS = 5000

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function Testimonials() {
  const pauseAuto = useRef(false)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      duration: 42,
      dragFree: false,
    },
    [],
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on("reInit", onSelect)
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("reInit", onSelect)
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi || typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    const id = window.setInterval(() => {
      if (!pauseAuto.current) emblaApi.scrollNext()
    }, AUTO_SLIDE_MS)
    return () => window.clearInterval(id)
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  return (
    <section
      id="testimonials"
      className="bg-card py-20 md:py-28"
      onMouseEnter={() => {
        pauseAuto.current = true
      }}
      onMouseLeave={() => {
        pauseAuto.current = false
      }}
    >
      <div className="site-container">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 font-medium text-secondary">
            <div className="h-0.5 w-8 bg-secondary" />
            Testimonials
            <div className="h-0.5 w-8 bg-secondary" />
          </div>

          <h2 className="mb-6 text-balance font-sans text-3xl font-normal text-foreground md:text-4xl lg:text-5xl">
            What Our Happy Clients Are Saying
          </h2>

          <p className="text-muted-foreground">
            Real reviews from our Google Business Profile — thank you to our clients in Edmonton & area.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y items-start gap-6 [-webkit-overflow-scrolling:touch]">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="min-w-0 shrink-0 grow-0 basis-full self-start md:basis-[calc((100%-3rem)/3)]"
              >
                <div className="rounded-xl border border-border bg-card p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
                  <div className="mb-2.5 flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-normal text-white ${testimonial.color}`}
                      >
                        {testimonial.initial}
                      </div>
                      <div className="min-w-0">
                        <h4 className="truncate font-normal text-foreground">{testimonial.name}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                      </div>
                    </div>
                    <a
                      href={GOOGLE_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                      aria-label="View on Google"
                    >
                      <GoogleIcon />
                    </a>
                  </div>

                  <div className="mb-2 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-0.5 text-xs text-blue-500">✓</span>
                  </div>

                  <p className="line-clamp-4 text-sm leading-snug text-foreground">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="rounded-full bg-transparent"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "w-6 bg-primary" : "bg-border hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="rounded-full bg-transparent"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className="bg-[#8B2332] text-white hover:bg-[#6d1c28]"
          >
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
              Leave a Google Review
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
            </a>
          </Button>
          <Button asChild variant="outline" className="border-[#8B2332] text-[#8B2332] hover:bg-[#8B2332]/10">
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              See all reviews on Google
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
