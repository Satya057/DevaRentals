import { Users, CreditCard, Wrench, FileText, Megaphone, ArrowRight, Home, MessageSquare, Heart, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const landlordServices = [
  {
    icon: Users,
    title: "Tenant Screening & Leasing",
    description: "We find qualified tenants, manage showings, and handle contracts.",
  },
  {
    icon: CreditCard,
    title: "Rent Collection & Reports",
    description: "Automated rent tracking with monthly financial updates.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repairs",
    description: "Prompt service by our trusted in-house and partner teams.",
  },
  {
    icon: FileText,
    title: "Legal Compliance",
    description: "From lease drafting to regulation updates — we've got it covered.",
  },
  {
    icon: Megaphone,
    title: "Marketing & Vacancy Management",
    description: "Strategic listings that get your property seen and filled fast.",
  },
]

const tenantFeatures = [
  {
    icon: Wrench,
    title: "Lightning-fast maintenance",
    description: "Quick response to all your maintenance needs",
  },
  {
    icon: MessageSquare,
    title: "Straight-talk communication",
    description: "Clear, honest, and responsive communication",
  },
  {
    icon: Home,
    title: "Quality homes",
    description: "Properties you're proud to call home",
  },
  {
    icon: Handshake,
    title: "Fair dealings",
    description: "Honest and transparent rental experience",
  },
]

export function Services() {
  return (
    <>
      {/* For Landlords Section */}
      <section id="landlords" className="py-20 md:py-28 bg-card">
        <div className="w-[90%] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop"
                  alt="Modern property interior"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
                  <p className="text-lg font-medium">
                    We treat your property with the care it deserves, and deliver the returns you expect.
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-secondary font-medium mb-4">
                <div className="w-8 h-0.5 bg-secondary" />
                For Property Owners
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
                For Landlords
              </h2>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Managing property shouldn{"'"}t feel like a full-time job. At Deva Rentals, we offer a full-service 
                solution that maximizes your rental income while eliminating the daily stress.
              </p>

              <div className="space-y-4 mb-8">
                {landlordServices.map((service) => (
                  <div key={service.title} className="flex gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* For Tenants Section */}
      <section id="tenants" className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="w-[90%] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 text-secondary font-medium mb-4">
                <div className="w-8 h-0.5 bg-secondary" />
                For Renters
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-balance">
                For Tenants
              </h2>
              
              <p className="text-lg mb-4">
                Experience responsive rental management for homes in Edmonton.
              </p>
              
              <p className="opacity-80 mb-8 leading-relaxed">
                Tired of unresponsive property managers who ignore maintenance problems? 
                We put tenant satisfaction first. Sleep soundly knowing you{"'"}re renting from 
                Edmonton{"'"}s most responsive property management team.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {tenantFeatures.map((feature) => (
                  <div key={feature.title} className="flex gap-3 items-start">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm opacity-80">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="#contact">
                  Rental Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop"
                  alt="Bright modern apartment interior"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card text-card-foreground p-6 rounded-lg shadow-xl max-w-xs">
                <Heart className="h-8 w-8 text-primary mb-2" />
                <p className="font-medium">
                  Join hundreds of happy tenants who trust Deva Rentals
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
