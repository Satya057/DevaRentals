import { Award, Building, Users } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-card">
      <div className="w-[90%] mx-auto max-w-6xl">
        <div className="relative">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-7 md:row-span-2">
              <div className="relative h-full min-h-[280px] md:min-h-[400px] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
                  alt="Modern home exterior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-6 md:col-span-5">
              <div className="relative h-40 md:h-48 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxury living room"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-6 md:col-span-5">
              <div className="relative h-40 md:h-48 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                  alt="Modern kitchen interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 right-0 sm:-bottom-6 sm:-right-4 md:-right-6 bg-primary text-primary-foreground p-4 sm:p-6 rounded-lg shadow-xl">
            <div className="text-3xl sm:text-4xl font-serif font-bold">10+</div>
            <div className="text-xs sm:text-sm">Years of Excellence</div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 rounded-xl bg-muted p-6 md:gap-6 md:p-8">
          <div className="text-center">
            <Building className="h-7 w-7 text-primary mx-auto mb-2 md:h-8 md:w-8" />
            <div className="text-xl font-bold font-serif text-foreground md:text-2xl">500+</div>
            <div className="text-[10px] text-muted-foreground md:text-xs">Properties</div>
          </div>
          <div className="text-center">
            <Users className="h-7 w-7 text-primary mx-auto mb-2 md:h-8 md:w-8" />
            <div className="text-xl font-bold font-serif text-foreground md:text-2xl">1000+</div>
            <div className="text-[10px] text-muted-foreground md:text-xs">Happy Clients</div>
          </div>
          <div className="text-center">
            <Award className="h-7 w-7 text-primary mx-auto mb-2 md:h-8 md:w-8" />
            <div className="text-xl font-bold font-serif text-foreground md:text-2xl">A+</div>
            <div className="text-[10px] text-muted-foreground md:text-xs">Certified</div>
          </div>
        </div>
      </div>
    </section>
  )
}
