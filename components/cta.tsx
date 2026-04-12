import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

const formLinks = [
  { href: "/forms/landlord", label: "Landlord Inquiry" },
  { href: "/forms/rental", label: "Rental Application" },
  { href: "/forms/schedule", label: "Schedule Viewing" },
  { href: "/forms/service", label: "Service Request" },
]

export function CTA() {
  return (
    <section className="py-10 md:py-14 bg-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-[90%] max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-semibold text-foreground mb-3 text-balance">
            Ready to Experience Stress-Free Property Management?
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
            Whether you{"'"}re a property owner ready to maximize returns or a tenant searching 
            for your perfect Edmonton home, let{"'"}s talk.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-10 cursor-pointer">
              <Link href="#contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-6 h-10 bg-transparent cursor-pointer">
              <Link href="tel:780-984-1996">
                Call 780-984-1996
              </Link>
            </Button>
          </div>

          <div className="mt-5 rounded-lg border border-border/70 bg-background/70 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Direct Form Links (shareable)
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {formLinks.map((form) => (
                <Button key={form.href} asChild variant="outline" className="h-9 bg-transparent px-4 cursor-pointer">
                  <Link href={form.href} className="inline-flex items-center">
                    {form.label}
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Partner Logos */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              We proudly partner or are affiliated with the following organizations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-5 md:gap-6 opacity-60">
              <div className="text-lg md:text-xl font-semibold text-foreground">RECA</div>
              <div className="text-lg md:text-xl font-semibold text-foreground">AREA</div>
              <div className="text-lg md:text-xl font-semibold text-foreground">BBB</div>
              <div className="text-lg md:text-xl font-semibold text-foreground">NARPM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
