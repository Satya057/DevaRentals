import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Clock } from "lucide-react"

/** Full-res asset from `public/pic/` — served as-is (no resize/compress) for a sharp 4K-class photo. */
const HERO_BG_SRC = "/pic/heroimg.jpg"

const heroFeatureCardClass =
  "hero-motion-up grid cursor-default grid-cols-[auto_1fr] items-center gap-2 rounded-lg border border-white/25 bg-black/50 px-2.5 py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.55)] ring-1 ring-white/15 backdrop-blur-md sm:gap-2.5 sm:px-3 sm:py-2 sm:rounded-xl md:px-3"

/** Sticky header: main row h-[4.25rem]; lg adds top bar ~py-2.5 + content (~2.5rem) ≈ +3.25rem */
const heroViewport =
  "min-h-[calc(100svh-4.25rem)] max-h-[calc(100svh-4.25rem)] lg:min-h-[calc(100svh-7.75rem)] lg:max-h-[calc(100svh-7.75rem)]"

export function Hero() {
  return (
    <section id="home" className={`relative flex w-full flex-col overflow-hidden ${heroViewport}`}>
      <div className="absolute inset-0 z-0 h-full overflow-hidden">
        <div className="absolute inset-0 h-full">
          <img
            src={HERO_BG_SRC}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_42%] sm:object-center"
          />
        </div>
        <div className="absolute inset-0 h-full bg-black/10" />
        <div className="absolute inset-0 h-full bg-gradient-to-r from-black/55 via-black/38 to-black/18" />
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.06),transparent_42%)]" />
        <div
          className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(ellipse_95%_90%_at_50%_42%,transparent_25%,rgba(0,0,0,0.28)_100%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-0 w-[90%] max-w-7xl flex-1 flex-col justify-between gap-2 py-3 pb-3 pt-2 sm:gap-3 sm:py-4 md:gap-4 md:py-5">
        <div className="min-w-0 shrink">
          <div className="text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.7)] lg:max-w-3xl">
            <div
              className="hero-motion-up mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs shadow-sm backdrop-blur-md sm:mb-2.5 sm:gap-2 sm:px-3.5 sm:text-sm"
              style={{ ["--hero-d" as string]: "40ms" }}
            >
              <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Edmonton{"'"}s Trusted Property Management</span>
            </div>

            <h1
              className="hero-motion-up mb-2 text-balance font-sans text-[1.65rem] font-normal leading-[1.1] tracking-[-0.02em] sm:mb-2.5 sm:text-3xl sm:leading-[1.12] md:text-[2.35rem] md:leading-[1.1] lg:text-5xl lg:leading-[1.06]"
              style={{ ["--hero-d" as string]: "90ms" }}
            >
              Find the Perfect Property for Your Lifestyle
            </h1>

            <p
              className="hero-motion-up mb-3 max-w-2xl text-sm leading-snug text-white/92 sm:mb-3.5 sm:text-base sm:leading-relaxed md:text-[1.05rem]"
              style={{ ["--hero-d" as string]: "140ms" }}
            >
              Transform your Edmonton rental property into a stress-free investment. 10+ years of delivering rock-solid
              results for property owners.
            </p>

            <div
              className="hero-motion-up mb-3 flex flex-wrap gap-2 sm:mb-3.5 sm:gap-3"
              style={{ ["--hero-d" as string]: "190ms" }}
            >
              <Button
                asChild
                size="default"
                className="h-10 rounded-lg border-2 border-white/40 bg-secondary px-5 text-sm font-normal text-secondary-foreground shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:border-white/55 hover:bg-secondary/90 hover:shadow-xl active:scale-[0.99] sm:h-11 sm:px-7 sm:text-base"
              >
                <Link
                  href="https://www.rentfaster.ca/ab/edmonton/rentals/?l=11,53.5249,-113.47&user_ID=2236644"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  Available Properties
                  <ArrowRight className="ml-1.5 h-4 w-4 shrink-0 opacity-95 sm:ml-2 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="default"
                className="h-10 rounded-lg border-2 border-white/40 bg-secondary px-5 text-sm font-normal text-secondary-foreground shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:border-white/55 hover:bg-secondary/90 hover:shadow-xl active:scale-[0.99] sm:h-11 sm:px-7 sm:text-base"
              >
                <Link href="/rented-properties" className="inline-flex items-center">
                  Rented Property
                  <ArrowRight className="ml-1.5 h-4 w-4 shrink-0 opacity-95 sm:ml-2 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>

            <div
              className="hero-motion-up mt-1 w-full max-w-4xl border-t border-white/25 pt-2.5 text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.65),0_1px_3px_rgba(0,0,0,0.8)] sm:pt-3 md:pt-3.5"
              style={{ ["--hero-d" as string]: "240ms" }}
              role="region"
              aria-label="Company statistics"
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-5 md:gap-8">
                <div className="text-center sm:text-left">
                  <div className="font-sans text-xl font-normal sm:text-2xl md:text-3xl">10+</div>
                  <div className="mt-0.5 text-[10px] opacity-90 sm:mt-1 sm:text-xs md:text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="font-sans text-xl font-normal sm:text-2xl md:text-3xl">500+</div>
                  <div className="mt-0.5 text-[10px] opacity-90 sm:mt-1 sm:text-xs md:text-sm">Properties Managed</div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="font-sans text-xl font-normal sm:text-2xl md:text-3xl">98%</div>
                  <div className="mt-0.5 text-[10px] opacity-90 sm:mt-1 sm:text-xs md:text-sm">Client Satisfaction</div>
                </div>
              </div>
              <p className="mt-1.5 text-center text-[9px] font-medium uppercase leading-tight tracking-wide text-white/85 sm:mt-2 sm:text-[10px] sm:text-left md:text-xs">
                Certified ·{" "}
                <span className="font-sans font-normal normal-case tracking-normal">Licensed Property Management</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid w-full shrink-0 grid-cols-1 gap-2 min-[420px]:grid-cols-3 min-[420px]:gap-1.5 sm:gap-2.5">
          <div className={heroFeatureCardClass} style={{ ["--hero-d" as string]: "320ms" }}>
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/15 text-white sm:size-9">
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="text-xs font-normal leading-snug text-white sm:text-sm">Maximize ROI</h3>
              <p className="mt-0.5 line-clamp-2 text-[9px] leading-tight text-white/80 sm:text-[11px] sm:leading-snug md:text-xs">
                Expert tenant management that boosts your rental income
              </p>
            </div>
          </div>
          <div className={heroFeatureCardClass} style={{ ["--hero-d" as string]: "380ms" }}>
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/15 text-white sm:size-9">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="text-xs font-normal leading-snug text-white sm:text-sm">Fast Response</h3>
              <p className="mt-0.5 line-clamp-2 text-[9px] leading-tight text-white/80 sm:text-[11px] sm:leading-snug md:text-xs">
                Lightning-fast maintenance through our trusted vendor network
              </p>
            </div>
          </div>
          <div className={heroFeatureCardClass} style={{ ["--hero-d" as string]: "440ms" }}>
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white/15 text-white sm:size-9">
              <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="text-xs font-normal leading-snug text-white sm:text-sm">Legal Compliance</h3>
              <p className="mt-0.5 line-clamp-2 text-[9px] leading-tight text-white/80 sm:text-[11px] sm:leading-snug md:text-xs">
                Stay bulletproof with Alberta rental law expertise
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
