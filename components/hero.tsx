import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Clock } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
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

      <div className="w-[90%] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.7)]">
            <div className="inline-flex items-center gap-2 bg-black/35 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Shield className="h-4 w-4" />
              <span>Edmonton{"'"}s Trusted Property Management</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 text-balance">
              Find the Perfect Property for Your Lifestyle
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed max-w-xl">
              Transform your Edmonton rental property into a stress-free investment. 
              10+ years of delivering rock-solid results for property owners.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                asChild 
                size="lg" 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base px-8"
              >
                <Link href="#contact">
                  Available Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-white/60 text-white hover:bg-white/15 text-base px-8 bg-transparent"
              >
                <Link href="#landlords">For Landlords</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/30">
              <div>
                <div className="text-3xl md:text-4xl font-bold font-serif">10+</div>
                <div className="text-sm opacity-80">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold font-serif">500+</div>
                <div className="text-sm opacity-80">Properties Managed</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold font-serif">98%</div>
                <div className="text-sm opacity-80">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Feature Cards — equal cell sizes; three white cards share same width/height */}
          <div className="hidden lg:grid min-h-[32rem] grid-cols-2 grid-rows-2 gap-4">
            <div className="bg-card/95 backdrop-blur p-6 rounded-lg shadow-xl min-h-0 min-w-0 h-full flex flex-col">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 shrink-0">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Maximize ROI</h3>
              <p className="text-sm text-muted-foreground">Expert tenant management that boosts your rental income</p>
            </div>
            <div className="bg-card/95 backdrop-blur p-6 rounded-lg shadow-xl min-h-0 min-w-0 h-full flex flex-col">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fast Response</h3>
              <p className="text-sm text-muted-foreground">Lightning-fast maintenance through our trusted vendor network</p>
            </div>
            <div className="bg-card/95 backdrop-blur p-6 rounded-lg shadow-xl min-h-0 min-w-0 h-full flex flex-col">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Legal Compliance</h3>
              <p className="text-sm text-muted-foreground">Stay bulletproof with Alberta rental law expertise</p>
            </div>
            <div className="bg-card/90 backdrop-blur-md p-6 rounded-lg border border-border shadow-xl min-h-0 min-w-0 h-full flex flex-col justify-center">
              <div className="text-foreground">
                <div className="text-sm font-medium mb-2">A Certified Company</div>
                <div className="text-2xl font-serif font-bold">Licensed Property Management</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
