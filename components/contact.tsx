"use client"

import React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, Building, CalendarDays, FileText, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LandlordInquiryForm } from "@/components/forms/landlord-inquiry-form"
import { ScheduleViewingForm } from "@/components/forms/schedule-viewing-form"
import { RentalApplicationForm } from "@/components/forms/rental-application-form"
import { ServiceRequestForm } from "@/components/forms/service-request-form"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@devarentals.com",
    href: "mailto:info@devarentals.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "780-984-1996",
    href: "tel:780-984-1996",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "4027 10 Ave NW, Edmonton, AB",
    href: "https://maps.google.com/?q=4027+10+Ave+NW,+Edmonton,+AB",
  },
]

const formCards = [
  {
    id: "landlord",
    icon: Building,
    label: "Landlord Inquiry",
    description: "List your property with us",
    title: "Landlord Inquiry Form",
  },
  {
    id: "schedule",
    icon: CalendarDays,
    label: "Schedule Viewing",
    description: "Book a property tour",
    title: "Schedule Viewing",
  },
  {
    id: "rental",
    icon: FileText,
    label: "Rental Application",
    description: "Apply for a rental property",
    title: "Rental Application",
  },
  {
    id: "service",
    icon: Wrench,
    label: "Service Request",
    description: "Submit a maintenance request",
    title: "Service Request",
  },
]

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const renderForm = (formId: string, onClose: () => void) => {
    switch (formId) {
      case "landlord":
        return <LandlordInquiryForm onSuccess={onClose} />
      case "schedule":
        return <ScheduleViewingForm onSuccess={onClose} />
      case "rental":
        return <RentalApplicationForm onSuccess={onClose} />
      case "service":
        return <ServiceRequestForm onSuccess={onClose} />
      default:
        return null
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-card">
      <div className="w-[90%] mx-auto">
        {/* Quick Links to Forms */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-secondary font-medium mb-4">
            <div className="w-8 h-0.5 bg-secondary" />
            Quick Access
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-balance">
            Forms & Applications
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {formCards.map((card) => {
              const IconComponent = card.icon
              return (
                <Dialog 
                  key={card.id}
                  open={openDialog === card.id} 
                  onOpenChange={(open) => setOpenDialog(open ? card.id : null)}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-4 p-5 bg-muted rounded-xl hover:bg-primary/10 transition-colors group border border-transparent hover:border-primary/20 text-left w-full cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <IconComponent className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{card.label}</p>
                        <p className="text-sm text-muted-foreground">{card.description}</p>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-4xl max-h-[90vh] p-0 bg-[#f5f0e8]">
                    <DialogHeader className="px-6 pt-6 pb-0">
                      <DialogTitle className="text-2xl font-serif text-[#8B2332] text-center">
                        {card.title}
                      </DialogTitle>
                      <div className="w-16 h-0.5 bg-[#8B2332] mx-auto mt-2" />
                    </DialogHeader>
                    <ScrollArea className="max-h-[calc(90vh-100px)] px-6 pb-6">
                      {renderForm(card.id, () => setOpenDialog(null))}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="inline-flex items-center gap-2 text-secondary font-medium mb-4">
              <div className="w-8 h-0.5 bg-secondary" />
              Get In Touch
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6 text-balance">
              Contact Us
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Have questions about our property management services? Ready to get started? 
              We{"'"}d love to hear from you. Reach out through any of the channels below or 
              fill out the form.
            </p>

            <div className="space-y-6 mb-12">
              {contactInfo.map((info) => {
                const InfoIcon = info.icon
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.label === "Address" ? "_blank" : undefined}
                    rel={info.label === "Address" ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <InfoIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden h-64 bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2371.8076647736!2d-113.4938!3d53.5461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDMyJzQ2LjAiTiAxMTPCsDI5JzM3LjciVw!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Deva Rentals Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-muted rounded-xl p-8 lg:p-10">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
              Send Us a Message
            </h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h4>
                <p className="text-muted-foreground">We{"'"}ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      className="bg-card"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                      className="bg-card"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(780) 123-4567"
                    className="bg-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry">Inquiry Type</Label>
                  <Select>
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landlord">Landlord Inquiry</SelectItem>
                      <SelectItem value="tenant">Tenant Inquiry</SelectItem>
                      <SelectItem value="viewing">Schedule Viewing</SelectItem>
                      <SelectItem value="application">Rental Application</SelectItem>
                      <SelectItem value="service">Service Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your property management needs..."
                    rows={4}
                    required
                    className="bg-card resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
