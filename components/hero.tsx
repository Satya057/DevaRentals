import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Clock } from "lucide-react"

/** Full-res asset from `public/pic/` — served as-is (no resize/compress) for a sharp 4K-class photo. */
const HERO_BG_SRC = "/pic/heroimg.jpg"

const heroFeatureCardClass =
  "hero-motion-up grid cursor-default grid-cols-[auto_1fr] items-center gap-3 rounded-xl border border-white/25 bg-black/50 px-3 py-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/15 backdrop-blur-md md:px-3.5 md:py-2.5"

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] w-full flex-col">
      {/* Clip only the media stack — content below can extend without being cut off */}
      <div className="absolute inset-0 z-0 min-h-[100dvh] overflow-hidden">
        <div className="absolute inset-0 min-h-[100dvh]">
          {/* Native img: full file bytes, no transform animation (avoids GPU softening). */}
          <img
            src={HERO_BG_SRC}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full min-h-[100dvh] object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 min-h-[100dvh] bg-black/10" />
        <div className="absolute inset-0 min-h-[100dvh] bg-gradient-to-r from-black/55 via-black/38 to-black/18" />
        <div className="absolute inset-0 min-h-[100dvh] bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.06),transparent_42%)]" />
        <div
          className="pointer-events-none absolute inset-0 min-h-[100dvh] bg-[radial-gradient(ellipse_95%_90%_at_50%_42%,transparent_25%,rgba(0,0,0,0.28)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex w-[90%] max-w-7xl flex-col gap-8 py-8 pb-12 pt-12 md:gap-10 md:py-12 md:pb-14 md:pt-16">
        <div className="w-full">
          <div className="text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.7)] lg:max-w-3xl">
            <div
              className="hero-motion-up mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-sm shadow-sm backdrop-blur-md"
              style={{ ["--hero-d" as string]: "40ms" }}
            >
              <Shield className="h-4 w-4" />
              <span>Edmonton{"'"}s Trusted Property Management</span>
            </div>

            <h1
              className="hero-motion-up mb-4 text-balance font-sans text-4xl font-normal leading-[1.12] tracking-[-0.02em] md:text-5xl lg:text-[3.15rem] lg:leading-[1.06]"
              style={{ ["--hero-d" as string]: "90ms" }}
            >
              Find the Perfect Property for Your Lifestyle
            </h1>

            <p
              className="hero-motion-up mb-5 max-w-2xl text-base leading-relaxed text-white/92 md:mb-6 md:text-lg md:leading-relaxed"
              style={{ ["--hero-d" as string]: "140ms" }}
            >
              Transform your Edmonton rental property into a stress-free investment. 10+ years of delivering rock-solid
              results for property owners.
            </p>

            <div
              className="hero-motion-up mb-5 flex flex-wrap gap-3 md:gap-4"
              style={{ ["--hero-d" as string]: "190ms" }}
            >
              <Button
                asChild
                size="lg"
                className="rounded-lg border-2 border-white/40 bg-secondary px-8 text-base font-normal text-secondary-foreground shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:border-white/55 hover:bg-secondary/90 hover:shadow-xl active:scale-[0.99]"
              >
                <Link
                  href="https://www.rentfaster.ca/ab/edmonton/rentals/?l=11,53.5249,-113.47&user_ID=2236644"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  Available Properties
                  <ArrowRight className="ml-2 h-5 w-5 shrink-0 opacity-95" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-lg border-2 border-white/40 bg-secondary px-8 text-base font-normal text-secondary-foreground shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:border-white/55 hover:bg-secondary/90 hover:shadow-xl active:scale-[0.99]"
              >
                <Link href="/rented-properties" className="inline-flex items-center">
                  Rented Property
                  <ArrowRight className="ml-2 h-5 w-5 shrink-0 opacity-95" />
                </Link>
              </Button>
            </div>

            <div
              className="hero-motion-up mt-2 w-full max-w-4xl border-t border-white/30 pt-5 text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.65),0_1px_3px_rgba(0,0,0,0.8)] lg:mt-6"
              style={{ ["--hero-d" as string]: "240ms" }}
              role="region"
              aria-label="Company statistics"
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-10">
                <div className="text-center sm:text-left">
                  <div className="font-sans text-2xl font-normal md:text-3xl">10+</div>
                  <div className="mt-1 text-xs opacity-90 sm:text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="font-sans text-2xl font-normal md:text-3xl">500+</div>
                  <div className="mt-1 text-xs opacity-90 sm:text-sm">Properties Managed</div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="font-sans text-2xl font-normal md:text-3xl">98%</div>
                  <div className="mt-1 text-xs opacity-90 sm:text-sm">Client Satisfaction</div>
                </div>
              </div>
              <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-wide text-white/85 sm:text-xs sm:text-left">
                Certified ·{" "}
                <span className="font-sans font-normal normal-case tracking-normal">Licensed Property Management</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:gap-3">
          <div className={heroFeatureCardClass} style={{ ["--hero-d" as string]: "320ms" }}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/15 text-white">
              <TrendingUp className="h-4 w-4" aria-hidden />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="text-sm font-normal leading-snug text-white">Maximize ROI</h3>
              <p className="mt-0.5 text-[11px] leading-snug text-white/80 sm:text-xs">
                Expert tenant management that boosts your rental income
              </p>
            </div>
          </div>
          <div className={heroFeatureCardClass} style={{ ["--hero-d" as string]: "380ms" }}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/15 text-white">
              <Clock className="h-4 w-4" aria-hidden />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="text-sm font-normal leading-snug text-white">Fast Response</h3>
              <p className="mt-0.5 text-[11px] leading-snug text-white/80 sm:text-xs">
                Lightning-fast maintenance through our trusted vendor network
              </p>
            </div>
          </div>
          <div className={heroFeatureCardClass} style={{ ["--hero-d" as string]: "440ms" }}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/15 text-white">
              <Shield className="h-4 w-4" aria-hidden />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="text-sm font-normal leading-snug text-white">Legal Compliance</h3>
              <p className="mt-0.5 text-[11px] leading-snug text-white/80 sm:text-xs">
                Stay bulletproof with Alberta rental law expertise
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
