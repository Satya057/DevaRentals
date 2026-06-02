import Link from "next/link"
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Zap,
  Home,
  Star,
  ThumbsUp,
} from "lucide-react"

/** Full-res PNG from `public/pic/` — plain img tag, no Next/Image compression. */
const HERO_BG_SRC = "/pic/heroimg.png"
const HERO_BG_WIDTH = 1536
const HERO_BG_HEIGHT = 1024

/** Sticky header: main row h-[4.25rem]; lg adds top bar ~py-2.5 + content (~2.5rem) ≈ +3.25rem */
const heroViewport =
  "min-h-[calc(100svh-4.25rem)] max-h-[calc(100svh-4.25rem)] lg:min-h-[calc(100svh-7.75rem)] lg:max-h-[calc(100svh-7.75rem)]"

const heroGoldText =
  "bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent"

const heroFeatures = [
  {
    icon: TrendingUp,
    ringClass: "border-amber-400/45 bg-amber-500/15 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    title: "Maximize ROI",
    description: "Expert tenant management that boosts your rental income",
    delay: "340ms",
  },
  {
    icon: Zap,
    ringClass: "border-violet-400/40 bg-violet-500/15 text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.22)]",
    title: "Fast Response",
    description: "Lightning-fast maintenance through our trusted vendor network",
    delay: "400ms",
  },
  {
    icon: Shield,
    ringClass: "border-sky-400/40 bg-sky-500/15 text-sky-200 shadow-[0_0_20px_rgba(59,130,246,0.22)]",
    title: "Legal Compliance",
    description: "Stay bulletproof with Alberta rental law expertise",
    delay: "460ms",
  },
] as const

export function Hero() {
  return (
    <section id="home" className={`relative flex w-full flex-col overflow-hidden ${heroViewport}`}>
      <div className="absolute inset-0 z-0 isolate overflow-hidden">
        {/* Image on its own layer — no blur, filter, or backdrop effects */}
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
        {/* Overlays only — kept light so the photo stays sharp */}
        <div className="pointer-events-none absolute inset-0 bg-black/5" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a1628]/55 via-[#0a1628]/22 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/45 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 site-container flex min-h-0 flex-1 flex-col justify-between gap-3 py-4 pb-4 pt-3 sm:gap-4 sm:py-5 md:py-6">
        <div className="min-w-0 shrink">
          <div className="text-white lg:max-w-3xl">
            {/* Badge — white outline (ref 1) + gold shield (ref 2) */}
            <div
              className="hero-motion-up mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/45 px-3.5 py-1.5 text-xs shadow-[0_4px_24px_rgba(0,0,0,0.35)] ring-1 ring-amber-400/20 sm:mb-4 sm:px-4 sm:text-sm"
              style={{ ["--hero-d" as string]: "40ms" }}
            >
              <Shield className="h-3.5 w-3.5 text-amber-400 sm:h-4 sm:w-4" aria-hidden />
              <span className="font-medium tracking-wide text-white/95">
                Edmonton{"'"}s Trusted Property Management
              </span>
            </div>

            {/* Headline — serif + dual gold highlights from both refs */}
            <h1
              className="hero-motion-up mb-3 font-display text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.01em] sm:mb-4 sm:text-[2.25rem] md:text-[2.65rem] lg:text-[3.1rem] lg:leading-[1.08]"
              style={{ ["--hero-d" as string]: "90ms" }}
            >
              <span className="text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
                Find the Perfect{" "}
                <span className={heroGoldText}>Property</span> for
              </span>
              <span className={`mt-1 block sm:mt-0.5 ${heroGoldText}`}>Your Lifestyle.</span>
            </h1>

            <p
              className="hero-motion-up mb-4 max-w-xl text-sm leading-relaxed text-white/88 sm:mb-5 sm:text-base md:text-[1.05rem] [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]"
              style={{ ["--hero-d" as string]: "140ms" }}
            >
              Transform your Edmonton rental property into a stress-free investment.{" "}
              <span className="font-semibold text-amber-400">10+ years</span> of delivering rock-solid results for
              property owners.
            </p>

            {/* Stats first (ref 1 layout) + circular badges + ref 2 labels */}
            <div
              className="hero-motion-up mb-4 border-t border-amber-400/25 pt-4 sm:mb-5 sm:pt-5"
              style={{ ["--hero-d" as string]: "190ms" }}
              role="region"
              aria-label="Company statistics"
            >
              <div className="grid max-w-lg grid-cols-2 gap-4 sm:gap-8">
                <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left">
                  <div className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 shadow-[0_0_24px_rgba(245,158,11,0.15)] sm:mb-0">
                    <Star className="h-5 w-5 text-amber-400" aria-hidden />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold tabular-nums leading-none sm:text-3xl">10+</div>
                    <div className="mt-1 text-xs font-medium text-white/90 sm:text-sm">Years Experience</div>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left">
                  <div className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-amber-400/40 bg-amber-500/10 shadow-[0_0_24px_rgba(245,158,11,0.15)] sm:mb-0">
                    <ThumbsUp className="h-5 w-5 text-amber-400" aria-hidden />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold tabular-nums leading-none sm:text-3xl">98%</div>
                    <div className="mt-1 text-xs font-medium text-white/90 sm:text-sm">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-center text-[9px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-white/75 sm:mt-4 sm:text-left sm:text-[10px]">
                Certified &amp; Licensed{" "}
                <span className="text-amber-400/80">·</span>{" "}
                <span className="font-sans font-medium normal-case tracking-normal text-white/85">
                  Proven Results for Property Owners
                </span>
              </p>
            </div>

            {/* CTA — wide bar (ref 1) + gradient + house icon (ref 2) */}
            <div
              className="hero-motion-up mb-2 sm:mb-3"
              style={{ ["--hero-d" as string]: "250ms" }}
            >
              <Link
                href="https://www.rentfaster.ca/ab/edmonton/rentals/?l=11,53.5249,-113.47&user_ID=2236644"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-full max-w-md items-center justify-center gap-2.5 rounded-xl border border-amber-300/35 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 px-5 text-sm font-semibold text-white shadow-[0_10px_36px_-8px_rgba(245,158,11,0.6),0_4px_14px_rgba(0,0,0,0.35)] ring-1 ring-white/15 transition-[transform,box-shadow] duration-200 hover:scale-[1.015] hover:shadow-[0_14px_44px_-8px_rgba(245,158,11,0.7)] active:scale-[0.99] sm:h-[3.25rem] sm:gap-3 sm:text-base"
              >
                <Home className="h-4 w-4 shrink-0 opacity-95 sm:h-[1.125rem] sm:w-[1.125rem]" aria-hidden />
                View Available Properties
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar — glass strip (ref 2) + bronze rings with color glow (unique) */}
        <div
          className="hero-motion-up w-full shrink-0 overflow-hidden rounded-xl border border-white/18 bg-[#0a1628]/72 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55)] sm:rounded-2xl"
          style={{ ["--hero-d" as string]: "310ms" }}
        >
          <div className="grid min-[420px]:grid-cols-3">
            {heroFeatures.map(({ icon: Icon, ringClass, title, description, delay }, index) => (
              <div
                key={title}
                className={`hero-motion-up flex items-center gap-2.5 px-3 py-3 sm:gap-3 sm:px-4 sm:py-3.5 ${
                  index > 0 ? "border-t border-white/10 min-[420px]:border-t-0 min-[420px]:border-l min-[420px]:border-white/10" : ""
                }`}
                style={{ ["--hero-d" as string]: delay }}
              >
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full border sm:size-10 ${ringClass}`}
                >
                  <Icon className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" aria-hidden />
                </div>
                <div className="min-w-0 text-left">
                  <h3 className="text-xs font-semibold leading-snug text-white sm:text-sm">{title}</h3>
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
