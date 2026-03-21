import { Award, Building, Users, CheckCircle } from "lucide-react"

const features = [
  "Attack vacancy problems head-on",
  "Streamline rent collection",
  "Jump on maintenance issues before they escalate",
  "Maximize your investment",
  "Protect your peace of mind",
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-card">
      <div className="w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images Grid */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7 row-span-2">
                <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
                    alt="Modern home exterior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="col-span-5">
                <div className="relative h-48 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury living room"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="col-span-5">
                <div className="relative h-48 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                    alt="Modern kitchen interior"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
              <div className="text-4xl font-serif font-bold">10+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <div className="inline-flex items-center gap-2 text-secondary font-medium mb-4">
              <div className="w-8 h-0.5 bg-secondary" />
              About Us
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
              What We Are About
            </h2>
            
            <p className="text-lg text-foreground font-medium mb-4">
              Transform your Edmonton rental property into a stress-free investment.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              For 10+ years, Deva Rentals has delivered rock-solid results for property owners across Edmonton. 
              From single-family homes to condos and apartments, we don{"'"}t just manage properties, we maximize 
              your investment and protect your peace of mind.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-muted rounded-lg">
              <div className="text-center">
                <Building className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold font-serif text-foreground">500+</div>
                <div className="text-xs text-muted-foreground">Properties</div>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold font-serif text-foreground">1000+</div>
                <div className="text-xs text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold font-serif text-foreground">A+</div>
                <div className="text-xs text-muted-foreground">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
