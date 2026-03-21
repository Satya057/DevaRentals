"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Karishma",
    initial: "K",
    color: "bg-emerald-600",
    rating: 5,
    text: "I really appreciate their work. Highly recommended! Work in effective and efficient manner. One of the best in Edmonton.",
    date: "1 month ago",
  },
  {
    name: "Pankaj Bakshi",
    initial: "P",
    color: "bg-blue-600",
    rating: 5,
    text: "Clear communication, a transparent leasing process, and professional management made our experience as tenants positive and stress-free.",
    date: "1 month ago",
  },
  {
    name: "Sisodiya Indrajitsinh",
    initial: "S",
    color: "bg-amber-600",
    rating: 5,
    text: "Communication was quick and helpful whenever we had questions, which made the rental experience much easier. The lease process was transparent, and the team was professional throughout.",
    date: "1 month ago",
  },
  {
    name: "Sarah M.",
    initial: "S",
    color: "bg-rose-600",
    rating: 5,
    text: "As a property owner, I've seen a significant increase in my rental income since partnering with Deva Rentals. Their tenant screening process is thorough and effective.",
    date: "2 months ago",
  },
  {
    name: "Michael R.",
    initial: "M",
    color: "bg-indigo-600",
    rating: 5,
    text: "Finally found a property management company that actually cares. Maintenance requests are handled within 24 hours, and the communication is excellent.",
    date: "2 months ago",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ]

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-card">
      <div className="w-[90%] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-secondary font-medium mb-4">
            <div className="w-8 h-0.5 bg-secondary" />
            Testimonials
            <div className="w-8 h-0.5 bg-secondary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
            What Our Happy Clients Are Saying
          </h2>
          
          <p className="text-muted-foreground">
            Discover the experiences of homeowners and tenants who trust us with their property needs.
          </p>
        </div>

        {/* Desktop Testimonials */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {testimonial.initial}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs text-blue-500 ml-1">✓</span>
              </div>
              
              <p className="text-foreground leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Testimonial */}
        <div className="md:hidden">
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${testimonials[currentIndex].color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {testimonials[currentIndex].initial}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonials[currentIndex].date}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 mb-3">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-foreground leading-relaxed">
              {testimonials[currentIndex].text}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="rounded-full bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="rounded-full bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
