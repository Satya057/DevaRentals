import Link from "next/link"
import {
  ChevronRight,
  Shield,
  TrendingUp,
  Zap,
  Users,
  Star,
} from "lucide-react"

/** Full-res PNG from `public/pic/` — plain img tag, no Next/Image compression. */
const HERO_BG_SRC = "/pic/heroimg.png"
const HERO_BG_WIDTH = 1536
const HERO_BG_HEIGHT = 1024

const heroViewport =
  "min-h-[calc(100dvh-4.25rem)] lg:min-h-[calc(100dvh-7.75rem)]"

const statIconRing =
  "flex size-12 shrink-0 items-center justify-center rounded-full border border-amber-400/50 bg-black/40 shadow-[0_0_32px_rgba(212,175,55,0.22)] sm:size-[3.35rem]"

const heroFeatures = [
  {
    icon: TrendingUp,
    title: "Maximize ROI",
    description: "Expert tenant management that boosts your rental income",
    delay: "340ms",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description: "Lightning-fast maintenance through our trusted vendor network",
    delay: "400ms",
  },
  {
    icon: Shield,
    title: "Legal Compliance",
    description: "Stay bulletproof with Alberta rental law expertise",
    delay: "460ms",
  },
] as const

export function Hero() {
  return (
    <section id="home" className={`relative flex w-full flex-col overflow-x-hidden ${heroViewport}`}>
      <div className="absolute inset-0 z-0 isolate overflow-hidden">
        <img
          src={HERO_BG_SRC}
          width={HERO_BG_WIDTH}
          height={HERO_BG_HEIGHT}
          alt=""
          role="presentation"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="hero-bg-img absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover object-[center_42%] sm:object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/5" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a1628]/60 via-[#0a1628]/25 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/50 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 site-container flex min-h-0 flex-1 flex-col justify-between gap-3 py-4 pb-4 pt-3 sm:gap-4 sm:py-5 md:py-6">
        <div className="min-w-0 shrink-0 lg:max-w-2xl xl:max-w-3xl">
          <div className="text-white">
            <div
              className="hero-motion-up mb-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/30 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] sm:text-xs"
              style={{ ["--hero-d" as string]: "40ms" }}
            >
              <Shield className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />
              Edmonton{"'"}s Trusted Property Management
            </div>

            <h1
              className="hero-motion-up mb-4 font-sans text-[1.75rem] font-semibold leading-[1.15] tracking-tight sm:mb-5 sm:text-[2.25rem] md:text-[2.65rem] lg:text-[2.85rem] lg:leading-[1.12]"
              style={{ ["--hero-d" as string]: "90ms" }}
            >
              Find the Perfect Property for Your Lifestyle
            </h1>

            <p
              className="hero-motion-up mb-6 max-w-xl text-sm leading-relaxed text-white/90 sm:mb-7 sm:text-base md:text-[1.0625rem] md:leading-relaxed"
              style={{ ["--hero-d" as string]: "140ms" }}
            >
              Transform your Edmonton rental property into a stress-free investment. 10+ years of delivering
              rock-solid results for property owners.
            </p>

            <div
              className="hero-motion-up mb-8 sm:mb-9"
              style={{ ["--hero-d" as string]: "190ms" }}
            >
              <Link
                href="https://www.rentfaster.ca/ab/edmonton/rentals/?l=11,53.5249,-113.47&user_ID=2236644"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90 sm:h-12 sm:px-7 sm:text-base"
              >
                Browse Available Properties
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 sm:h-[1.125rem] sm:w-[1.125rem]" />
              </Link>
            </div>

            <div
              className="hero-motion-up w-full max-w-xl sm:max-w-2xl"
              style={{ ["--hero-d" as string]: "250ms" }}
              role="region"
              aria-label="Company statistics"
            >
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 sm:gap-x-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={statIconRing}>
                    <Users className="h-5 w-5 text-amber-400 sm:h-[1.35rem] sm:w-[1.35rem]" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <div className="font-sans text-[1.75rem] font-semibold tabular-nums leading-none text-white sm:text-[2rem]">
                      10+
                    </div>
                    <div className="mt-2 text-sm font-normal text-white/95 sm:text-[0.9375rem]">
                      Years Experience
                    </div>
                    <div className="mt-2 text-[9px] font-normal uppercase leading-snug tracking-[0.08em] text-white/50 sm:text-[10px]">
                      Certified <span aria-hidden>•</span> Licensed Property Management
                    </div>
                  </div>
                </div>

                <div className="h-14 w-px shrink-0 bg-white/30 sm:h-16" aria-hidden />

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={statIconRing}>
                    <Star className="h-5 w-5 text-amber-400 sm:h-[1.35rem] sm:w-[1.35rem]" strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <div className="font-sans text-[1.75rem] font-semibold tabular-nums leading-none text-white sm:text-[2rem]">
                      98%
                    </div>
                    <div className="mt-2 text-sm font-normal text-white/95 sm:text-[0.9375rem]">
                      Client Satisfaction
                    </div>
                    <div className="mt-2 text-[9px] font-normal uppercase leading-snug tracking-[0.08em] text-white/50 sm:text-[10px]">
                      Dedicated to Exceeding Your Expectations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hero-motion-up w-full shrink-0 overflow-hidden rounded-xl border border-white/18 bg-[#0a1628]/72 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55)] sm:rounded-2xl"
          style={{ ["--hero-d" as string]: "310ms" }}
        >
          <div className="grid min-[420px]:grid-cols-3">
            {heroFeatures.map(({ icon: Icon, title, description, delay }, index) => (
              <div
                key={title}
                className={`hero-motion-up flex items-center gap-2.5 px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5 ${
                  index > 0 ? "border-t border-white/10 min-[420px]:border-t-0 min-[420px]:border-l min-[420px]:border-white/10" : ""
                }`}
                style={{ ["--hero-d" as string]: delay }}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white sm:size-10">
                  <Icon className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" aria-hidden />
                </div>
                <div className="min-w-0 text-left">
                  <h3 className="text-xs font-medium leading-snug text-white sm:text-sm">{title}</h3>
                  <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-white/72 sm:text-[11px] md:text-xs">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
