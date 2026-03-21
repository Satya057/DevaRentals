import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { WhyUs } from "@/components/why-us"
import { Services } from "@/components/services"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <WhyUs />
      <Services />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
