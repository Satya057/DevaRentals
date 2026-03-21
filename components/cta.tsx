import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 md:py-28 bg-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-[90%] mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
            Ready to Experience Stress-Free Property Management?
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you{"'"}re a property owner ready to maximize returns or a tenant searching 
            for your perfect Edmonton home, let{"'"}s talk.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <Link href="#contact">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8 bg-transparent">
              <Link href="tel:780-984-1996">
                Call 780-984-1996
              </Link>
            </Button>
          </div>

          {/* Partner Logos */}
          <div className="mt-16 pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground mb-6">
              We proudly partner or are affiliated with the following organizations
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-foreground">RECA</div>
              <div className="text-2xl font-bold text-foreground">AREA</div>
              <div className="text-2xl font-bold text-foreground">BBB</div>
              <div className="text-2xl font-bold text-foreground">NARPM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
