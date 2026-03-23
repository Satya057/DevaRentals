import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

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
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3 text-balance">
            Ready to Experience Stress-Free Property Management?
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
            Whether you{"'"}re a property owner ready to maximize returns or a tenant searching 
            for your perfect Edmonton home, let{"'"}s talk.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-10">
              <Link href="#contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-6 h-10 bg-transparent">
              <Link href="tel:780-984-1996">
                Call 780-984-1996
              </Link>
            </Button>
          </div>

          {/* Partner Logos */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              We proudly partner or are affiliated with the following organizations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-5 md:gap-6 opacity-60">
              <div className="text-lg md:text-xl font-bold text-foreground">RECA</div>
              <div className="text-lg md:text-xl font-bold text-foreground">AREA</div>
              <div className="text-lg md:text-xl font-bold text-foreground">BBB</div>
              <div className="text-lg md:text-xl font-bold text-foreground">NARPM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
