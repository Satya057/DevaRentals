import { TrendingDown, DollarSign, Wrench, Scale, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const problems = [
  "High tenant turnover that destroys your rental income",
  "Delayed repairs that frustrate good tenants and cost more money",
  "Unreliable contractors who overcharge and underdeliver",
]

const solutions = [
  {
    icon: TrendingDown,
    title: "Slash Vacancy Rates",
    description: "Proven marketing strategies that fill your property fast",
  },
  {
    icon: DollarSign,
    title: "Boost Your ROI",
    description: "Expert tenant management that maximizes returns",
  },
  {
    icon: Wrench,
    title: "Fast Maintenance",
    description: "Trusted vendor network for quick, quality repairs",
  },
  {
    icon: Scale,
    title: "Legal Compliance",
    description: "Stay bulletproof with Alberta rental law expertise",
  },
]

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-muted">
      <div className="w-[90%] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-secondary font-medium mb-4">
              <div className="w-8 h-0.5 bg-secondary" />
              Why Choose Us
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
              Why Deva Rentals
            </h2>
            
            <p className="text-lg font-semibold text-foreground mb-4">
              Stop struggling with these landlord nightmares
            </p>
            
            <ul className="space-y-3 mb-8">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3 text-muted-foreground">
                  <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>

            <p className="text-foreground mb-8 leading-relaxed">
              Our licensed property management company in Edmonton crushes these problems.
              <span className="block mt-2 font-medium text-primary">
                We don{"'"}t just manage, we supercharge your rental property investment.
              </span>
            </p>

            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Solutions Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                className={`bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow ${
                  index % 2 === 1 ? "sm:mt-8" : ""
                }`}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <solution.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{solution.title}</h3>
                <p className="text-muted-foreground">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
