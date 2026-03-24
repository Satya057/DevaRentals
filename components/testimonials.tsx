"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import type { EmblaCarouselType } from "embla-carousel"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Karishma",
    initial: "K",
    color: "bg-emerald-600",
    rating: 5,
    text: "I really appreciate their work. Highly recommended! Work in effective and efficient manner. One of the best in Edmonton.",
    date: "1 month ago",
  },
  {
    name: "Pankaj Bakshi",
    initial: "P",
    color: "bg-blue-600",
    rating: 5,
    text: "Clear communication, a transparent leasing process, and professional management made our experience as tenants positive and stress-free.",
    date: "1 month ago",
  },
  {
    name: "Sisodiya Indrajitsinh",
    initial: "S",
    color: "bg-amber-600",
    rating: 5,
    text: "Communication was quick and helpful whenever we had questions, which made the rental experience much easier. The lease process was transparent, and the team was professional throughout.",
    date: "1 month ago",
  },
  {
    name: "Sarah M.",
    initial: "S",
    color: "bg-rose-600",
    rating: 5,
    text: "As a property owner, I've seen a significant increase in my rental income since partnering with Deva Rentals. Their tenant screening process is thorough and effective.",
    date: "2 months ago",
  },
  {
    name: "Michael R.",
    initial: "M",
    color: "bg-indigo-600",
    rating: 5,
    text: "Finally found a property management company that actually cares. Maintenance requests are handled within 24 hours, and the communication is excellent.",
    date: "2 months ago",
  },
]

const AUTO_SLIDE_MS = 5000

function GoogleIcon() {
  return (
    <svg className="h-6 w-6 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
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
      <div className="mx-auto w-[90%] max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 font-medium text-secondary">
            <div className="h-0.5 w-8 bg-secondary" />
            Testimonials
            <div className="h-0.5 w-8 bg-secondary" />
          </div>

          <h2 className="mb-6 text-balance font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            What Our Happy Clients Are Saying
          </h2>

          <p className="text-muted-foreground">
            Discover the experiences of homeowners and tenants who trust us with their property needs.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-6 [-webkit-overflow-scrolling:touch]">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="min-w-0 shrink-0 grow-0 basis-full md:basis-[calc((100%-3rem)/3)]"
              >
                <div className="h-full rounded-xl border border-border bg-card p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${testimonial.color}`}
                      >
                        {testimonial.initial}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                      </div>
                    </div>
                    <GoogleIcon />
                  </div>

                  <div className="mb-3 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="ml-1 text-xs text-blue-500">✓</span>
                  </div>

                  <p className="leading-relaxed text-foreground">{testimonial.text}</p>
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
      </div>
    </section>
  )
}
