import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Clock, Check } from "lucide-react"

const ownerHighlights = [
  "Attack vacancy problems head-on",
  "Streamline rent collection",
  "Jump on maintenance issues before they escalate",
  "Maximize your investment",
  "Protect your peace of mind",
]

const aboutIntroBold =
  "Transform your Edmonton rental property into a stress-free investment."

const aboutBody =
  "For 10+ years, Deva Rentals has delivered rock-solid results for property owners across Edmonton. From single-family homes to condos and apartments, we don't just manage properties, we maximize your investment and protect your peace of mind."

const HERO_HIGHLIGHT_STAGGER_MS = 48

const heroFeatureCardClass =
  "hero-motion-up grid cursor-default grid-cols-[auto_1fr] items-center gap-3 rounded-lg border-2 border-primary/25 bg-card/95 px-3 py-2.5 shadow-lg shadow-black/10 ring-1 ring-white/60 backdrop-blur-md"

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-[min(54vh,620px)] items-center overflow-hidden py-3 md:py-4">
      {/* Background image (no color wash — photo stays natural) */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-[90%] max-w-7xl flex-col">
        <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-7 xl:gap-9">
          <div className="text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.7)] lg:max-w-3xl">
            <div
              className="hero-motion-up mb-3 inline-flex items-center gap-2 rounded-full bg-black/35 px-4 py-1.5 text-sm backdrop-blur-sm"
              style={{ ["--hero-d" as string]: "40ms" }}
            >
              <Shield className="h-4 w-4" />
              <span>Edmonton{"'"}s Trusted Property Management</span>
            </div>

            <h1
              className="hero-motion-up mb-3 text-balance font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-[3rem] lg:leading-[1.08]"
              style={{ ["--hero-d" as string]: "90ms" }}
            >
              Find the Perfect Property for Your Lifestyle
            </h1>

            <p
              className="hero-motion-up mb-4 max-w-xl text-base leading-relaxed opacity-90 md:text-lg"
              style={{ ["--hero-d" as string]: "140ms" }}
            >
              Transform your Edmonton rental property into a stress-free investment. 10+ years of delivering rock-solid
              results for property owners.
            </p>

            <div
              className="hero-motion-up mb-4 flex flex-wrap gap-3 lg:mb-0"
              style={{ ["--hero-d" as string]: "190ms" }}
            >
              <Button
                asChild
                size="lg"
                className="border-2 border-white/35 bg-secondary px-8 text-base font-semibold text-secondary-foreground shadow-lg ring-2 ring-black/10 transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:border-white/50 hover:bg-secondary/90 hover:shadow-xl active:scale-[0.99]"
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
                className="border-2 border-white/35 bg-secondary px-8 text-base font-semibold text-secondary-foreground shadow-lg ring-2 ring-black/10 transition-[transform,box-shadow] duration-200 hover:scale-[1.02] hover:border-white/50 hover:bg-secondary/90 hover:shadow-xl active:scale-[0.99]"
              >
                <Link href="/rented-properties" className="inline-flex items-center">
                  Rented Property
                  <ArrowRight className="ml-2 h-5 w-5 shrink-0 opacity-95" />
                </Link>
              </Button>
            </div>

            {/* Stats — mobile / tablet: under buttons; desktop: stays in left column */}
            <div
              className="hero-motion-up mt-1 w-full max-w-4xl border-t border-white/35 pt-4 text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.65),0_1px_3px_rgba(0,0,0,0.8)] lg:mt-5"
              style={{ ["--hero-d" as string]: "240ms" }}
              role="region"
              aria-label="Company statistics"
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-10">
                <div className="text-center sm:text-left">
                  <div className="font-serif text-2xl font-bold md:text-3xl">10+</div>
                  <div className="mt-1 text-xs opacity-90 sm:text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="font-serif text-2xl font-bold md:text-3xl">500+</div>
                  <div className="mt-1 text-xs opacity-90 sm:text-sm">Properties Managed</div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="font-serif text-2xl font-bold md:text-3xl">98%</div>
                  <div className="mt-1 text-xs opacity-90 sm:text-sm">Client Satisfaction</div>
                </div>
              </div>
              <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-wide text-white/85 sm:text-xs sm:text-left">
                Certified ·{" "}
                <span className="font-serif font-bold normal-case tracking-normal">Licensed Property Management</span>
              </p>
            </div>
          </div>

          {/* Top-right: About card — solid white, maroon accents, warm list rows */}
          <div className="lg:justify-self-end lg:w-full lg:max-w-md xl:max-w-xl">
            <div
              className="hero-motion-up rounded-[1.25rem] border border-black/[0.06] bg-white/95 p-5 shadow-[0_24px_48px_-12px_rgba(15,10,10,0.26),0_8px_16px_-6px_rgba(15,10,10,0.1),0_0_0_1px_rgba(108,21,23,0.04)] backdrop-blur-sm md:p-6 xl:p-7"
              style={{ ["--hero-d" as string]: "160ms" }}
            >
              <h2 className="sr-only">About Deva Rentals</h2>
              <p className="mb-2 text-pretty text-base font-bold leading-snug tracking-tight text-[#1c1917] md:text-lg md:leading-snug">
                {aboutIntroBold}
              </p>

              <p className="mb-4 max-w-prose text-sm leading-[1.55] text-neutral-600 md:text-[0.9375rem] md:leading-[1.6]">
                {aboutBody}
              </p>

              <ul className="flex flex-col gap-1.5">
                {ownerHighlights.map((line, i) => (
                  <li
                    key={line}
                    className="hero-motion-from-right group flex cursor-default items-start gap-2.5 rounded-md border border-[#ebe4e2]/90 bg-[#faf6f5] px-2.5 py-2"
                    style={{ ["--hero-d" as string]: `${220 + i * HERO_HIGHLIGHT_STAGGER_MS}ms` }}
                  >
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                      aria-hidden
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="pt-px text-[0.8125rem] leading-snug text-[#292524] md:text-[0.875rem]">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Three feature strips — alag-alag box, stats ke neeche, patli strip */}
        <div className="mt-4 grid w-full grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2 lg:mt-5 lg:gap-2.5">
          <div className={heroFeatureCardClass} style={{ ["--hero-d" as string]: "320ms" }}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="text-sm font-semibold leading-snug text-foreground">Maximize ROI</h3>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                Expert tenant management that boosts your rental income
              </p>
            </div>
          </div>
          <div className={heroFeatureCardClass} style={{ ["--hero-d" as string]: "380ms" }}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="text-sm font-semibold leading-snug text-foreground">Fast Response</h3>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                Lightning-fast maintenance through our trusted vendor network
              </p>
            </div>
          </div>
          <div className={heroFeatureCardClass} style={{ ["--hero-d" as string]: "440ms" }}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 text-left">
              <h3 className="text-sm font-semibold leading-snug text-foreground">Legal Compliance</h3>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                Stay bulletproof with Alberta rental law expertise
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
